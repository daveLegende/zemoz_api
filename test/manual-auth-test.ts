/**
 * Manual test script to validate email auth and magic link flow
 * Run with: npx ts-node test/manual-auth-test.ts
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/user/adapter/module/auth/auth.service';
import { UserService } from '../src/user/adapter/module/user/user.service';

async function runTests() {
  console.log('🧪 Starting manual auth tests...\n');

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const authService = moduleFixture.get<AuthService>(AuthService);
  const userService = moduleFixture.get<UserService>(UserService);

  const testData = {
    email: `test-${Date.now()}@example.com`,
    phone: '+33612345678',
    password: 'TestPassword123!',
    firstname: 'Test',
    lastname: 'User',
    country: 'FR',
  };

  try {
    // Test 1: Create user with email only
    console.log('✅ TEST 1: Create user with email only');
    const newUser = await userService.add({
      email: testData.email,
      phone: '',
      firstname: testData.firstname,
      lastname: testData.lastname,
      password: testData.password,
      country: testData.country,
    } as any);
    console.log(`   User created: ${newUser.id}`);
    console.log(`   Email: ${newUser.email}`);
    console.log(`   isActivated: ${newUser.isActivated}`);
    if (!newUser.isActivated) {
      console.log('   ✓ PASS: User is not activated (requires email verification)\n');
    } else {
      console.log('   ✗ FAIL: User should be deactivated\n');
    }

    // Test 2: Validate user by email
    console.log('✅ TEST 2: Validate user by email for login');
    const validatedUser = await authService.validateUser(testData.email, testData.password);
    if (validatedUser && validatedUser.email === testData.email) {
      console.log('   ✓ PASS: User validated by email\n');
    } else {
      console.log('   ✗ FAIL: User validation failed\n');
    }

    // Test 3: Login with email
    console.log('✅ TEST 3: Login with email');
    const loginResult = await authService.login(validatedUser);
    if (loginResult.accessToken && loginResult.refreshToken && loginResult.user) {
      console.log('   ✓ PASS: Login successful, tokens generated\n');
    } else {
      console.log('   ✗ FAIL: Login failed\n');
    }

    // Test 4: Send magic link
    console.log('✅ TEST 4: Send magic link email');
    const magicLinkResult = await authService.sendMagicLink({ email: testData.email });
    if (magicLinkResult) {
      console.log('   ✓ PASS: Magic link sent (check email in prod)\n');
    } else {
      console.log('   ✗ FAIL: Magic link send failed\n');
    }

    // Test 5: Verify magic link token
    console.log('✅ TEST 5: Verify magic link token');
    // Generate a token like the backend would
    const jwtService = moduleFixture.get('JwtService');
    const token = jwtService.sign(
      { sub: newUser.id, email: testData.email },
      {
        secret: process.env.EMAIL_TOKEN_SECRET || process.env.JWT_SECRET,
        expiresIn: '24h',
      },
    );
    const verifyResult = await authService.verifyMagicLink(token);
    if (verifyResult.accessToken && verifyResult.user.isActivated) {
      console.log('   ✓ PASS: Magic link verified, user activated\n');
    } else {
      console.log('   ✗ FAIL: Magic link verification failed\n');
    }

    // Test 6: Login by phone (backward compatibility)
    console.log('✅ TEST 6: Login by phone (backward compatibility)');
    const phoneUser = await userService.add({
      email: `phone-test-${Date.now()}@example.com`,
      phone: testData.phone,
      firstname: 'Phone',
      lastname: 'User',
      password: testData.password,
      country: testData.country,
    } as any);
    const phoneValidatedUser = await authService.validateUser(testData.phone, testData.password);
    if (phoneValidatedUser && phoneValidatedUser.phone === testData.phone) {
      console.log('   ✓ PASS: User can still login by phone\n');
    } else {
      console.log('   ✗ FAIL: Phone login failed\n');
    }

    console.log('✅ All tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runTests();
