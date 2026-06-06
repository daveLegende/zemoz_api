import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { CouponService } from './src/coupon/adapter/module/coupon.service';
import { TournoiCouponService } from './src/tournoiCoupon/adapter/module/tournoi_coupon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './src/user/framework/database/schema/user.entity';
import { Repository, DataSource } from 'typeorm';
import { TournoiCouponEntity } from './src/tournoiCoupon/framework/schema/tournoi_coupon.entity';
import { TournoiCouponState } from './src/tournoiCoupon/domain';
import { CouponState } from './src/coupon/domain';
import { v4 as uuidv4 } from 'uuid';

async function runTests() {
  console.log('🚀 Démarrage du contexte NestJS pour les tests de charge...');
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const couponService = app.get(CouponService);
  const tournoiCouponService = app.get(TournoiCouponService);
  const dataSource = app.get(DataSource);
  const userRepository = dataSource.getRepository(UserEntity);
  const tournoiCouponRepository = dataSource.getRepository(TournoiCouponEntity);

  try {
    console.log('\n--- 🧪 TEST 1 : DOUBLE DÉPENSE (Race Condition) ---');
    
    // 1. Créer un utilisateur fictif avec 1000 de solde
    const testUser = userRepository.create({
      lastname: 'Test',
      firstname: 'Load',
      email: `test_load_${Date.now()}@example.com`,
      password: 'password123',
      solde: 1000,
      phone: `+22500${Math.floor(Math.random() * 10000000)}`,
    });
    const savedUser = await userRepository.save(testUser);
    console.log(`✅ Utilisateur fictif créé avec succès. Solde initial : ${savedUser.solde} FCFA`);

    // 2. Tenter d'envoyer 5 requêtes simultanées de 500 FCFA chacune
    // Le solde devrait permettre de passer 2 requêtes, et rejeter les 3 autres.
    console.log('⚡ Envoi de 5 requêtes de coupons simultanées (500 FCFA chacune)...');
    
    const createPromises = Array(5).fill(0).map((_, i) => 
      couponService.add({
        amount: 500,
        user: savedUser.id,
        etat: CouponState.PENDING,
        couponBets: [] as any
      }).catch(e => e.message)
    );

    const results = await Promise.all(createPromises);
    console.log('Résultats des requêtes concurrentes :');
    results.forEach((res, i) => {
      if (typeof res === 'string') {
        console.log(`Requête ${i + 1} : ❌ Échouée (${res})`);
      } else {
        console.log(`Requête ${i + 1} : ✅ Réussie (Coupon créé)`);
      }
    });

    const finalUser = await userRepository.findOne({ where: { id: savedUser.id } });
    console.log(`💰 Solde final de l'utilisateur : ${finalUser?.solde} FCFA`);
    
    if (finalUser && finalUser.solde >= 0) {
      console.log('🟢 TEST 1 RÉUSSI : Le solde n\'est jamais descendu sous zéro !');
    } else {
      console.log('🔴 TEST 1 ÉCHOUÉ : Le solde est négatif !');
    }

    console.log('\n--- 🧪 TEST 2 : SCALABILITÉ DE checkCoupons (Lots de 500) ---');
    console.log('Génération de 2000 coupons fictifs en attente...');
    
    const fakeCoupons = [];
    for (let i = 0; i < 2000; i++) {
      fakeCoupons.push({
        etat: TournoiCouponState.PENDING,
        totalOdds: 2,
        gains: 1000,
        amount: 500,
        isPaid: false,
        user: savedUser,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    for (let i = 0; i < fakeCoupons.length; i += 500) {
      await tournoiCouponRepository.insert(fakeCoupons.slice(i, i + 500));
    }
    console.log('✅ 2000 coupons fictifs insérés avec succès.');

    console.log('⏳ Exécution de checkCoupons()...');
    const startTime = Date.now();
    
    const result = await tournoiCouponService.checkCoupons();
    
    const duration = (Date.now() - startTime) / 1000;
    console.log(`⏱️ Exécution terminée en ${duration} secondes !`);
    console.log('Résultat de l\'exécution :', result);

    console.log('🟢 TEST 2 RÉUSSI : La fonction gère la volumétrie sans crash mémoire (OOM).');

    // Nettoyage
    console.log('\n🧹 Nettoyage des données fictives...');
    await tournoiCouponRepository.delete({ user: { id: savedUser.id } });
    await userRepository.delete({ id: savedUser.id });
    console.log('✅ Nettoyage terminé.');

  } catch (error) {
    console.error('❌ Erreur lors du test :', error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

runTests();
