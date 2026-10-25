/**
 * Column names the validator expects. They follow the Google Merchant Center
 * product feed names, which most shops and marketplaces already use.
 */
export const REQUIRED_FIELDS = ['id', 'title', 'price', 'link', 'image_link'] as const;
