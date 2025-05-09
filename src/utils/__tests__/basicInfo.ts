import { schema as basicInfoSchema } from '@/forms/BasicInformation/schema';
import { formatDate, getAgeFromBirthDate, parseStringToDateSafely } from '../converter';
import { subYears } from 'date-fns';
import { isAgeRangeValid } from '@/utils/validation';

const validBasicInfo = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '0912345678',
  nationality: 'TW',
  gender: undefined,
  address: 'Taipei',
  birthDate: '1978-02-02',
};

describe('Validation Schema: BasicInfo', () => {
  describe('Field Name:', () => {
    it('it should be true, when name is John Doe', () => {
      const result = basicInfoSchema.safeParse({
        ...validBasicInfo,
        name: 'John Doe',
      });
      expect(result.success).toBeTruthy();
    });
    it('it should be false, when name is required but no content', () => {
      const result = basicInfoSchema.safeParse({
        ...validBasicInfo,
        name: '',
      });
      expect(result.success).toBeFalsy();
    });
  });

  describe('Field Email:', () => {
    it('it should be true, when email is yomanfunk+jp@gmail.com', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, email: 'yomanfunk+jp@gmail.com' });
      expect(result.success).toBeTruthy();
    });
    it('it should be true, when email is yomanfunk.test@gmail.com', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, email: 'yomanfunk.test@gmail.com' });
      expect(result.success).toBeTruthy();
    });
    it('it should be false, when email is required but no content', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, email: '' });
      expect(result.success).toBeFalsy();
    });
    it('it should be false, when email is yomanfunkgmail.com', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, email: 'yomanfunkgmail.com' });
      expect(result.success).toBe(false);
    });
  });

  describe('Field Phone:', () => {
    it('it should be true, when phone is 0912 345 678', () => {
      const result = basicInfoSchema.safeParse({
        ...validBasicInfo,
        phone: '0912 345 678',
        nationality: 'TW',
      });
      expect(result.success).toBeTruthy();
    });

    it('it should be false, when phone is required but no content', () => {
      const result = basicInfoSchema.safeParse({
        ...validBasicInfo,
        phone: '',
      });
      expect(result.success).toBeFalsy();
    });

    it('it should be false, when phone is invalid format', () => {
      const result = basicInfoSchema.safeParse({
        ...validBasicInfo,
        phone: '123456',
        nationality: 'TW',
      });
      expect(result.success).toBeFalsy();
    });

    it('it should be false, when phone is 0912 345 678 but nationality is US', () => {
      const result = basicInfoSchema.safeParse({
        ...validBasicInfo,
        phone: '0912 345 678',
        nationality: 'US',
      });
      expect(result.success).toBeFalsy();
    });
  });

  describe('Field  Nationality:', () => {
    it('it should be true, when nationality is TW', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, nationality: 'TW' });
      expect(result.success).toBeTruthy();
    });

    it('it should be false, when nationality is required but no content', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, nationality: '' });
      expect(result.success).toBeFalsy();
    });

    it('it should be false, when nationality is an invalid option (e.g. Taiwan)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, nationality: 'Taiwan' });
      expect(result.success).toBeFalsy();
    });
  });

  describe('Field gender:', () => {
    it('it should be true, when gender is male', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, gender: 'male' });
      expect(result.success).toBeTruthy();
    });

    it('it should be true, when gender is prefer_not_to_say', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, gender: 'prefer_not_to_say' });
      expect(result.success).toBeTruthy();
    });

    it('it should be true, when gender is not provided (undefined)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, gender: undefined });
      expect(result.success).toBeTruthy();
    });

    it('it should be false, when gender is an invalid option (e.g. other)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, gender: 'other' });
      expect(result.success).toBeFalsy();
    });
    it('it should be false, when gender is an invalid option (e.g. Male)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, gender: 'Male' });
      expect(result.success).toBeFalsy();
    });
  });

  describe('Field birthDate:', () => {
    it('it should be true, when birthDate is within 18-85 years (e.g. 1978-07-31)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, birthDate: '1978-07-31' });
      expect(result.success).toBeTruthy();
    });

    it('it should be false, when birthDate is required but no content', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, birthDate: '' });
      expect(result.success).toBeFalsy();
    });

    it('it should be false, when birthDate format is invalid (e.g. 07/31/1978)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, birthDate: '31/07/1978' });
      expect(result.success).toBeFalsy();
    });

    it('it should be false, when birthDate is invalid date (e.g. 1978-02-30)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, birthDate: '1978-02-30' });
      expect(result.success).toBeFalsy();
    });

    it('it should be false, when birthDate is too young (e.g. 2010-01-01)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, birthDate: '2010-01-01' });
      expect(result.success).toBeFalsy();
    });

    it('it should be false, when birthDate is too old (e.g. 1930-01-01)', () => {
      const result = basicInfoSchema.safeParse({ ...validBasicInfo, birthDate: '1930-01-01' });
      expect(result.success).toBeFalsy();
    });
  });
});

describe('/utils/converter', () => {
  describe('formatDate()', () => {
    it('should format a valid date to YYYY-MM-DD string', () => {
      const input = new Date('2025-05-05');
      const result = formatDate(input);
      expect(result).toBe('2025-05-05');
    });

    it('should return today formatted with 2025-05-09 if today is passed', () => {
      const input = new Date();
      const result = formatDate(input);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/); // e.g. 2025-05-09
    });
  });

  describe('parseStringToDateSafely()', () => {
    it.skip('should return a valid Date object from 2025-05-05', () => {
      const result = parseStringToDateSafely('2025-05-05');
      expect(result).toBeInstanceOf(Date);
      expect(result?.toISOString().startsWith('2025-05-05')).toBeTruthy();
    });

    it('should return null, when given undefined', () => {
      const result = parseStringToDateSafely(undefined);
      expect(result).toBeNull();
    });

    it('should return null, when given invalid date format (ex: 05/05/2025)', () => {
      const result = parseStringToDateSafely('05/05/2025');
      expect(result).toBeNull();
    });

    it('should return null, when given non-existent date ex: 2025-02-30', () => {
      const result = parseStringToDateSafely('2025-02-30');
      expect(result).toBeNull();
    });
  });

  describe('getAgeFromBirthDate()', () => {
    it('should return correct age when birthday is 18 years ago', () => {
      const today = new Date();
      const date18YearsAgo = new Date(today);
      date18YearsAgo.setFullYear(today.getFullYear() - 18);
      const result = getAgeFromBirthDate(formatDate(date18YearsAgo));
      expect(result).toBe(18);
    });

    it('should return 30 when birth date is 30 years ago', () => {
      const today = new Date();
      const date30YearsAgo = new Date(today);
      date30YearsAgo.setFullYear(today.getFullYear() - 30);
      const result = getAgeFromBirthDate(formatDate(date30YearsAgo));
      expect(result).toBe(30);
    });
  });

  describe('/utils/validation, isAgeRangeValid()', () => {
    const lowerBound = 18;
    const upperBound = 85;

    it('should return true, when age is exactly 18', () => {
      const birthday = formatDate(subYears(new Date(), lowerBound));
      expect(isAgeRangeValid(birthday, lowerBound, upperBound)).toBeTruthy();
    });

    it('should return true, when age is exactly 85', () => {
      const birthday = formatDate(subYears(new Date(), upperBound));
      expect(isAgeRangeValid(birthday, lowerBound, upperBound)).toBeTruthy();
    });

    it('should return false, when age is below 18', () => {
      const birthday = formatDate(subYears(new Date(), lowerBound - 1));
      expect(isAgeRangeValid(birthday, lowerBound, upperBound)).toBe(false);
    });

    it('should return false when age is above 85', () => {
      const birthday = formatDate(subYears(new Date(), upperBound + 1));
      expect(isAgeRangeValid(birthday, lowerBound, upperBound)).toBe(false);
    });
  });
});
