/**
 * Property test cho Thuộc tính 11: Các key i18n có giá trị khác nhau giữa hai ngôn ngữ
 * Validates: Requirements 11.3
 *
 * Feature: glomix-landing-page, Property 11: Các key i18n có giá trị khác nhau giữa hai ngôn ngữ
 */

import fc from 'fast-check';
import viMessages from './vi.json';
import enMessages from './en.json';

// Hàm đệ quy để lấy tất cả các cặp (key path, value) từ object lồng nhau
function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value as Record<string, unknown>, fullKey));
    } else if (typeof value === 'string') {
      acc[fullKey] = value;
    }
    return acc;
  }, {});
}

describe('Thuộc tính 11: Các key i18n có giá trị khác nhau giữa hai ngôn ngữ', () => {
  const viFlat = flattenObject(viMessages as unknown as Record<string, unknown>);
  const enFlat = flattenObject(enMessages as unknown as Record<string, unknown>);

  // Lấy tất cả key tồn tại trong cả hai file
  const sharedKeys = Object.keys(viFlat).filter((key) => key in enFlat);

  // Loại trừ các key được phép giống nhau:
  // - Tên thương hiệu, tên chứng chỉ quốc tế (AWS Partner, Blog, Case Studies)
  // - Từ quốc tế phổ biến không cần dịch (Email)
  // - Enum values dùng chung (AWS_Migration, AI_Integration, Both)
  // - Tên sản phẩm/dịch vụ là tên riêng tiếng Anh
  // - OG title chứa tên thương hiệu
  const ALLOWED_SAME_KEYS = new Set([
    'nav.langSwitch',
    'nav.caseStudies',                                    // Tên riêng quốc tế
    'nav.blog',                                           // Tên riêng quốc tế
    'hero.headline',                                      // Tên thương hiệu + tagline tiếng Anh
    'footer.brand',
    'footer.phone',
    'footer.email',
    'footer.emailLabel',                                  // "Email" — từ quốc tế
    'leadForm.email',                                     // "Email" — từ quốc tế
    'leadForm.emailPlaceholder',                          // placeholder email format
    'admin.dashboard.colEmail',                           // "Email" — từ quốc tế
    'admin.dashboard.serviceInterest.AWS_Migration',
    'admin.dashboard.serviceInterest.AI_Integration',
    'admin.dashboard.serviceInterest.Both',
    'leadForm.serviceOptions.awsMigration',
    'leadForm.serviceOptions.aiIntegration',
    'leadForm.serviceOptions.both',
    'products.cloudHealthCheck.name',
    'products.aiStarter.name',
    'products.growthOps.name',
    'services.aws.title',
    'services.ai.title',
    'about.awsPartner',                                   // Tên chứng chỉ AWS chính thức
    'metadata.ogTitle',                                   // Tên thương hiệu
  ]);

  const translatableKeys = sharedKeys.filter((key) => !ALLOWED_SAME_KEYS.has(key));

  test('Tất cả key có thể dịch phải có giá trị khác nhau giữa vi và en', () => {
    // Kiểm tra từng key một để dễ debug khi thất bại
    const sameValueKeys: string[] = [];
    for (const key of translatableKeys) {
      if (viFlat[key] === enFlat[key]) {
        sameValueKeys.push(key);
      }
    }

    if (sameValueKeys.length > 0) {
      throw new Error(
        `Các key sau có giá trị giống nhau giữa vi và en (cần dịch):\n${sameValueKeys
          .map((k) => `  - ${k}: "${viFlat[k]}"`)
          .join('\n')}`
      );
    }
  });

  /**
   * **Validates: Requirements 11.3**
   * Property-based test: với bất kỳ key nào trong danh sách có thể dịch,
   * giá trị vi và en phải khác nhau.
   */
  test('Property 11: Với mọi key có thể dịch, vi.json và en.json phải có giá trị khác nhau', () => {
    fc.assert(
      fc.property(
        // Sinh ngẫu nhiên index trong danh sách key có thể dịch
        fc.integer({ min: 0, max: translatableKeys.length - 1 }),
        (index) => {
          const key = translatableKeys[index];
          const viValue = viFlat[key];
          const enValue = enFlat[key];
          // Giá trị phải khác nhau
          return viValue !== enValue;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Tất cả key trong vi.json phải tồn tại trong en.json', () => {
    const viKeys = Object.keys(viFlat);
    const enKeys = new Set(Object.keys(enFlat));
    const missingInEn = viKeys.filter((k) => !enKeys.has(k));

    if (missingInEn.length > 0) {
      throw new Error(
        `Các key sau có trong vi.json nhưng thiếu trong en.json:\n${missingInEn
          .map((k) => `  - ${k}`)
          .join('\n')}`
      );
    }
  });

  test('Tất cả key trong en.json phải tồn tại trong vi.json', () => {
    const enKeys = Object.keys(enFlat);
    const viKeys = new Set(Object.keys(viFlat));
    const missingInVi = enKeys.filter((k) => !viKeys.has(k));

    if (missingInVi.length > 0) {
      throw new Error(
        `Các key sau có trong en.json nhưng thiếu trong vi.json:\n${missingInVi
          .map((k) => `  - ${k}`)
          .join('\n')}`
      );
    }
  });
});
