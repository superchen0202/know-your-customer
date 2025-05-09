// import { schema as uploadDocSchema } from '@/forms/UploadDocument/schema';
import { checkInvalidFormatFileNumbers, checkOverSizedFileNumbers } from '../validation';

const mockFile = (name: string, type: string, size: number): File => new File(['x'.repeat(size)], name, { type });

const pdfFile = mockFile('file.pdf', 'application/pdf', 1024 * 1024);
const jpegFile = mockFile('image.png', 'image/jpeg', 500 * 1024);
const txtFile = mockFile('note.txt', 'text/plain', 300 * 1024);
const overSizeFile = mockFile('big.pdf', 'application/pdf', 6 * 1024 * 1024);

const ACCEPT = '.jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf';

describe('checkInvalidFormatFileNumbers()', () => {
  it('should return 0, when all formats are acceptable', () => {
    const files = [pdfFile, jpegFile];
    const result = checkInvalidFormatFileNumbers(files, ACCEPT);
    expect(result).toBe(0);
  });

  it('should return 1, when one file has invalid format (txt)', () => {
    const files = [pdfFile, txtFile];
    const result = checkInvalidFormatFileNumbers(files, ACCEPT);
    expect(result).toBe(1);
  });

  it('should return 0, when accept string is undefined', () => {
    const files = [pdfFile, txtFile];
    const result = checkInvalidFormatFileNumbers(files);
    expect(result).toBe(0);
  });

  it('should accept file with matching MIME type, even if filename has no extension', () => {
    const file = mockFile('noext', 'application/pdf', 1000);
    const result = checkInvalidFormatFileNumbers([file], ACCEPT);
    expect(result).toBe(0);
  });

  it('should return 0, when treat extension check as case-insensitive', () => {
    const file = mockFile('IMAGE.PNG', 'image/png', 1000);
    const result = checkInvalidFormatFileNumbers([file], ACCEPT);
    expect(result).toBe(0);
  });
});

describe('checkOverSizedFileNumbers()', () => {
  it('should return 0, when all files are within limit', () => {
    const files = [pdfFile, jpegFile];
    const result = checkOverSizedFileNumbers(files, 5 * 1024 * 1024); // 5MB
    expect(result).toBe(0);
  });

  it('should return 1, when one file exceeds maxBytes', () => {
    const files = [pdfFile, overSizeFile];
    const result = checkOverSizedFileNumbers(files, 5 * 1024 * 1024);
    expect(result).toBe(1);
  });

  it('should return 0, when maxBytes is undefined', () => {
    const files = [overSizeFile];
    const result = checkOverSizedFileNumbers(files);
    expect(result).toBe(0);
  });

  it('should return correct count when multiple files exceed limit', () => {
    const file1 = mockFile('1.pdf', 'application/pdf', 6 * 1024 * 1024);
    const file2 = mockFile('2.png', 'image/png', 7 * 1024 * 1024);
    const result = checkOverSizedFileNumbers([file1, file2], 5 * 1024 * 1024);
    expect(result).toBe(2);
  });
});
