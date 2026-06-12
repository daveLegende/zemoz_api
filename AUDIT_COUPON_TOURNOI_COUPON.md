# 🔍 AUDIT DE CODE - Modules Coupon et TournoiCoupon
**Date**: 2026-06-11  
**Zones analysées**: Validation, services, contrôleurs, DTOs

---

## ⚠️ PROBLÈMES CRITIQUES (Risques immédiats)

### 1. **⛔ Transaction non sécurisée dans `CouponService.add()` - RISQUE FINANCIER**
**Fichier**: [src/coupon/adapter/module/coupon.service.ts](src/coupon/adapter/module/coupon.service.ts#L45-L100)  
**Problème**: Le solde utilisateur est débité AVANT la création complète du coupon:
```typescript
// ❌ DANGER: Débit avant création complète
userExisted.solde -= amount;
await this.userRepository.users.update(userExisted);

// Si une erreur survient ici, l'argent est perdu
const couponEntity = await this.couponsRepository.coupons.create(...);
for (const cp of betsEntities) {
  await this.cpRepository.couponBets.create(cp); // ← Peut échouer
}
```

**Impact**: 
- Argent débité mais coupon non créé
- Solde utilisateur corrompu
- Pas de moyen de récupérer la transaction

**Solution**: Utiliser une transaction `DataSource.transaction()` comme dans TournoiCouponService

---

### 2. **⛔ Contrôleur Coupon - Mauvaise récupération du paramètre DELETE**
**Fichier**: [src/coupon/adapter/module/coupon.controller.ts](src/coupon/adapter/module/coupon.controller.ts#L130-L140)
```typescript
// ❌ INCORRECT
@Delete(':id')
remove(@Body() { id }: IDParamDTO): Promise<boolean> { // ← BODY au lieu de PARAM
  return this.couponService.remove(id);
}

// ✅ CORRECT (voir TournoiCoupon)
@Delete(':id')
remove(@Param() { id }: IDParamDTO): Promise<boolean> {
  return this.tournoiCouponService.remove(id);
}
```

**Impact**: 
- Le paramètre `id` dans l'URL ne sera jamais reçu
- La suppression échouera toujours
- Comportement différent entre les deux contrôleurs

---

### 3. **⛔ Méthode `remove()` - Pas de transaction**
**Fichier**: [src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts](src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts#L171-L176)
```typescript
async remove(id: string): Promise<boolean> {
  const coupon = await this.tournoiCouponsRepository.tournoiCoupons.findOne({ where: { id } });
  if (!coupon) return false;
  await this.tournoiCouponsRepository.tournoiCoupons.remove(coupon); // ← Pas sûr
  return true;
}
```

**Impact**: 
- Si l'utilisateur a gagné ce coupon, supprimer la trace corrompt les données financières
- Aucun contrôle des couponBets associés
- Possible suppression sans vérification d'état

**Recommandation**: Mettre à jour `isDeleted: true` au lieu de supprimer physiquement

---

## 🔴 PROBLÈMES HAUTS (Bugs attendus)

### 4. **🔴 CouponService - Méthodes non implémentées**
**Fichier**: [src/coupon/app/module/coupon.service.ts](src/coupon/app/module/coupon.service.ts#L16-L25)

```typescript
abstract class ICouponService {
  abstract setState(id: string): Promise<boolean>;
  abstract checkCoupons(data: IUpdateMatchDTO): Promise<any>;
  abstract validatePendingCoupons(): Promise<any>;
  // ...
}
```

Mais l'implémentation [src/coupon/adapter/module/coupon.service.ts](src/coupon/adapter/module/coupon.service.ts):
- ❌ `setState()` - **Pas de code**
- ❌ `checkCoupons()` - **Pas de code**
- ❌ `validatePendingCoupons()` - **Commentée**
- ❌ `remove()` - **Pas de code**

**Impact**: 
- Les contrôleurs appelleront des méthodes qui n'existent pas → RuntimeError
- Tests échoueront
- Fonctionnalité manquante en production

---

### 5. **🔴 Validation DTO insuffisante - CouponAccountDto**
**Fichier**: [src/coupon/adapter/dto/coupon.input.dto.ts](src/coupon/adapter/dto/coupon.input.dto.ts#L13-L60)

```typescript
export class CouponAccountDto {
    @IsString()
    user: string; // ✅ Validé

    @IsArray()
    couponBets: CouponBet[]; // ❌ PAS de @ValidateNested comme TournoiCouponAccountDto
                             // ❌ PAS de @Type(() => BetCoupon)
                             // ❌ PAS de MinArray/MaxArray

    @IsInt()
    amount: number; // ❌ Pas de Min/Max
                    // ❌ Pas de IsPositive
}
```

**Comparaison avec TournoiCouponAccountDto** ✅ (correct):
```typescript
@IsArray()
@ValidateNested({ each: true })
@Type(() => BetTournoiCoupon)
tournoiCouponBets: BetTournoiCoupon[]; // ✅ Correct
```

**Impact**: 
- Des objets non validés peuvent arriver au service
- Les erreurs ne sont détectées que tardivement
- Pas de gestion des montants négatifs

---

### 6. **🔴 Pas de validation Min/Max sur `amount`**
**Fichier**: [src/coupon/adapter/dto/coupon.input.dto.ts](src/coupon/adapter/dto/coupon.input.dto.ts#L45-L55)

```typescript
@ApiProperty({ type: Number, name: 'amount' })
@IsInt()
amount: number; // ❌ Pas de validation!
```

**Validations manquantes**:
- ❌ `@IsPositive()` - accepte les montants négatifs
- ❌ `@Min(100)` - pas de minimum
- ❌ `@Max(100000)` - pas de maximum dans le DTO
- La validation n'existe QUE dans le service → dupliquée

**Impact**: 
- Les clients reçoivent une réponse `400` au lieu d'une erreur DTO valide
- Logique métier mélangée entre DTO et Service
- Pas de cohérence

**Code du service** (ligne 43):
```typescript
if (amount < 100 || amount > 100000)
  throw new BadRequestException('Mise invalide (100 à 100000)');
```

---

### 7. **🔴 Pas de validation du tableau `couponBets`**
**Fichier**: [src/coupon/adapter/dto/coupon.input.dto.ts](src/coupon/adapter/dto/coupon.input.dto.ts#L33-L35)

```typescript
@IsArray()
couponBets: CouponBet[]; // ❌ Peut être un tableau vide!
```

**Tests possibles**:
```bash
POST /coupons
{
  "user": "123",
  "couponBets": [], // ← Accepté par le DTO
  "amount": 1000
}
```

**Validations manquantes**:
- ❌ `@ArrayMinSize(1)` - au moins 1 bet
- ❌ `@ArrayMaxSize(10)` - limite raisonnable

---

### 8. **🔴 Inconsistance d'implémentation `setState()`**
**Fichier comparaison**:

- [src/coupon/adapter/module/coupon.service.ts](src/coupon/adapter/module/coupon.service.ts): ❌ Pas de code
- [src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts](src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts#L165-L168):
```typescript
async setState(id: string): Promise<boolean> {
  return false; // ← Hard-coded false!
}
```

**Impact**: 
- Coupon: Appel à une méthode undefined
- TournoiCoupon: Retourne toujours false
- Fonctionnalité non utilisable

---

## 🟠 PROBLÈMES MOYENS (Améliorations)

### 9. **🟠 Pas de validation sur `user` ID**
**Fichier**: [src/coupon/adapter/dto/coupon.input.dto.ts](src/coupon/adapter/dto/coupon.input.dto.ts#L20-L30)

```typescript
@ApiProperty({
    type: String,
    name: 'user',
    description: 'ID de l\'utilisateur',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
})
@IsString()
user: string; // ❌ Pas de @IsUUID()
```

**Validations manquantes**:
- ❌ `@IsUUID()` - vérifier que c'est un UUID valide
- ❌ `@IsNotEmpty()` - vérifier que c'est pas vide

**Comparaison UpdateCouponDTO** ✅ (correct):
```typescript
@IsString()
@IsUUID()
id: string; // ✅ Correct pour le fichier UpdateCouponDTO
```

---

### 10. **🟠 Pas de validation sur `selectedOptions`**
**Fichier**: [src/coupon/app/dto/coupon.input.dto.ts](src/coupon/app/dto/coupon.input.dto.ts#L8-L10)

```typescript
export class BetCoupon {
  bet: string;
  selectedOptions: OddsClass; // ❌ Pas typé, pas validé
}
```

**Comparaison TournoiCoupon** ✅ (mieux):
```typescript
export class BetTournoiCoupon {
  @IsString()
  bet: string; // ✅ Validé

  @IsObject()
  selectedOptions: Record<string, number>; // ✅ Mieux typé
}
```

**Risques**:
- `selectedOptions` peut être null/undefined
- Peut contenir n'importe quel type
- Le service suppose `Object.keys()` qui peut échouer (ligne 64)

---

### 11. **🟠 Pas de gestion des erreurs dans `checkCoupons()`**
**Fichier**: [src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts](src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts#L246-L300)

```typescript
for (const coupon of pendingCoupons) {
  try {
    await this.dataSource.transaction(...); // ← OK
  } catch (error) {
    this.logger.error(`Erreur lors du traitement du coupon ${coupon.id}`);
    // On continue... mais le coupon reste PENDING
  }
}
```

**Impact**: 
- Si erreur DB: le coupon reste PENDING à jamais
- Pas de notification utilisateur
- Pas de retry logic

---

### 12. **🟠 Pas de validation cohérence totalOdds/gains**
**Fichier**: [src/coupon/adapter/module/coupon.service.ts](src/coupon/adapter/module/coupon.service.ts#L58-L75)

```typescript
let totalOdds = 1;

for (const cp of couponBets) {
  // ...calcul totalOdds
  const selectedOdds = Object.values(cp.selectedOptions)[0]; 
  totalOdds *= selectedOdds;
}

const gains = totalOdds * amount;
// ❌ Pas de vérification si gains est raisonnable (ex: > 1M FCFA)
```

**Risques**:
- Débordement numérique
- Calcul aberrant (totalOdds = 1000 * 100000 = 100M FCFA)
- Pas de limite sur les gains maximums

---

### 13. **🟠 Pas d'audit trail (logging) des opérations financières**
**Fichier**: [src/coupon/adapter/module/coupon.service.ts](src/coupon/adapter/module/coupon.service.ts#L30-L90)

```typescript
async add(data: CouponAccountDto): Promise<Coupon> {
  // ...
  userExisted.solde -= amount;
  await this.userRepository.users.update(userExisted);
  // ❌ Pas de log!
  
  const couponEntity = await this.couponsRepository.coupons.create(...);
  // ❌ Pas de log!
}
```

**Comparaison TournoiCoupon** ✅ (Mieux):
```typescript
this.logger.log(`✅ Paiement de ${gains} FCFA à l'utilisateur ${user.id}...`);
this.logger.error(`❌ Erreur lors du paiement: ${error.message}`);
```

**Impact**: 
- Impossible de tracer les transactions
- Audit financier impossible
- Débogage difficile

---

### 14. **🟠 Pas de vérification null/undefined pour `selectedOptions`**
**Fichier**: [src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts](src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts#L300-L310)

```typescript
for (const couponBet of couponWithBets.tournoiCouponBets) {
  const bet = couponBet.bet;
  
  // ✅ TournoiCoupon fait bien:
  if (!couponBet.selectedOptions || Object.keys(couponBet.selectedOptions).length === 0) {
    hasPending = true;
    continue;
  }
  
  const selected = Object.keys(couponBet.selectedOptions)[0];
}
```

**Mais CouponService n'a pas cette vérification!** (ligne 64):
```typescript
// ❌ PAS DE VÉRIFICATION
const selectedOdds = Object.values(cp.selectedOptions)[0]; // Peut crash
```

---

### 15. **🟠 Pas de gestion des couponBets orphelins**
**Scénario**:
1. Coupon créé avec 3 bets
2. L'un des bets est supprimé en DB
3. `checkCoupons()` cherche à valider → Erreur

**Impact**: Processus de validation bloqué

---

## 🟡 PROBLÈMES LÉGERS (Best Practices)

### 16. **🟡 Enum typo et logique inversée**
**Fichier**: [src/coupon/domain/coupon.enum.ts](src/coupon/domain/coupon.enum.ts)

```typescript
export enum CouponState {
    WIN = "GAGNER",      // Peut être WIN ou GAGNER?
    LOOSE = "PERDU",     // 🎯 Typo: LOOSE vs LOST
    PENDING = "PENDING"
}
```

**Comparaison avec TournoiCoupon** (même problème):
```typescript
export enum TournoiCouponState {
    WIN = "GAGNER",      // Même confusion
    LOOSE = "PERDU",     // Même typo
    PENDING = "PENDING"
}
```

**Impact**: 
- Confusion: utiliser `WIN` ou `"GAGNER"`?
- Typo anglais/français (LOOSE vs LOST)
- Code moins lisible

**Recommandation**:
```typescript
export enum CouponState {
    WON = "GAGNER",      // Correct: WON (past tense)
    LOST = "PERDU",      // Correct: LOST
    PENDING = "PENDING"
}
```

---

### 17. **🟡 Pas de soft delete**
**Fichier**: [src/coupon/domain/coupon.model.ts](src/coupon/domain/coupon.model.ts)

```typescript
export class Coupon extends ITimestamp {
    // ...
    isDeleted: boolean; // ✅ Propriété présente
}
```

**Mais le service utilise `remove()` physiquement!**
```typescript
// ❌ Suppression dure
await this.tournoiCouponsRepository.tournoiCoupons.remove(coupon);
```

**Impact**: 
- Perte de données historiques
- Pas de audit trail
- Impossible de récupérer les données

---

### 18. **🟡 Inconsistance entre interfaces et implémentations**
**Fichier**: [src/coupon/app/module/coupon.service.ts](src/coupon/app/module/coupon.service.ts) vs [src/coupon/adapter/module/coupon.service.ts](src/coupon/adapter/module/coupon.service.ts)

```typescript
// ❌ Interface déclare
abstract class ICouponService {
  abstract checkCoupons(data: IUpdateMatchDTO): Promise<any>;
}

// ✅ Implémentation TournoiCoupon appelle sans param
async checkCoupons(): Promise<any> {
  // ...
}
```

**Impact**: 
- Contrat API non respecté
- Confusion sur les paramètres attendus

---

### 19. **🟡 Factory pattern utilisé mais pas de normalisation**
**Fichier**: [src/coupon/adapter/coupon.factory.ts](src/coupon/adapter/coupon.factory.ts) (non lu)

```typescript
const coupon = await this.couponsRepository.coupons.create(
  await CouponFactory.create({ ...data, totalOdds, gains }, userExisted)
);
```

**Risque**: 
- Si Factory transforme les données, ce n'est pas documenté
- Pas de validation supplémentaire dans Factory

---

### 20. **🟡 Logs insuffisants**
**Fichier**: [src/coupon/adapter/module/coupon.service.ts](src/coupon/adapter/module/coupon.service.ts)

```typescript
private readonly logger = new Logger(); // ✅ Existe
// Mais non utilisé dans add(), edit(), etc.
```

**Impact**: 
- Impossible de tracer les problèmes
- Débogage difficile en production

---

## 📋 RÉSUMÉ DES RISQUES

| Sévérité | Nombre | Exemples |
|----------|--------|----------|
| 🔴 Critique | 3 | Transaction, Delete param, remove method |
| 🟠 Élevé | 5 | Méthodes non impl., DTO faible, validation |
| 🟡 Moyen | 7 | Soft delete, enums, logging |

---

## ✅ PLAN D'ACTION RECOMMANDÉ

### Phase 1 (Urgent - Avant Production):
1. ✅ Implémenter transactions dans `CouponService.add()`
2. ✅ Corriger `@Delete` parameter en `@Param` dans CouponController
3. ✅ Implémenter les méthodes manquantes (setState, remove, checkCoupons)
4. ✅ Ajouter validation DTO complète (min/max, arrays, UUID)

### Phase 2 (Court terme):
5. ✅ Ajouter logging dans opérations financières
6. ✅ Implémenter soft delete
7. ✅ Valider cohérence totalOdds/gains
8. ✅ Unifier les deux services (Coupon et TournoiCoupon)

### Phase 3 (Moyen terme):
9. ✅ Corriger typos enum (LOOSE → LOST)
10. ✅ Ajouter retry logic dans checkCoupons()
11. ✅ Créer tests unitaires pour tous les edge cases
12. ✅ Ajouter audit trail (historique des transactions)

---

## 🔗 Fichiers à modifier (priorité)

1. [src/coupon/adapter/module/coupon.service.ts](src/coupon/adapter/module/coupon.service.ts) - **CRITIQUE**
2. [src/coupon/adapter/module/coupon.controller.ts](src/coupon/adapter/module/coupon.controller.ts) - **CRITIQUE**
3. [src/coupon/adapter/dto/coupon.input.dto.ts](src/coupon/adapter/dto/coupon.input.dto.ts) - **ÉLEVÉ**
4. [src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts](src/tournoiCoupon/adapter/module/tournoi_coupon.service.ts) - **ÉLEVÉ**

---

**Fin de l'audit**
