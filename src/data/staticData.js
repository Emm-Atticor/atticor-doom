// Static data extracted from original app
export const CALENDAR = []
export const DM = { 501: 'New York', 502: 'Los Angeles', 503: 'Chicago' }
export const MEDIA = ['TV', 'Radio', 'OOH', 'Digital']
export const OOH_TYPES = ['Billboard', 'Transit', 'Street Furniture', 'Airport']
export function contractStatus(c) { return c?.signed ? 'signed' : c?.sent ? 'sent' : 'pending' }