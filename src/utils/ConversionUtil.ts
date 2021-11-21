export function convertPersianNumberToEnglishNumber(value: string): string {
    return value.replace(/[۰-۹]/g, digit => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)]);
}