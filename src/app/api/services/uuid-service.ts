/**
 * Service for UUID operations.
 * Encapsulates the business logic for generating and formatting UUIDs.
 */
export const UuidService = {
  /**
   * Generates a random UUID with metadata.
   * @param prefix Optional prefix to prepend to the UUID
   * @returns Object containing the UUID and timestamp
   */
  generate(prefix?: string) {
    const rawUuid = crypto.randomUUID();
    const finalUuid = prefix ? `${prefix}-${rawUuid}` : rawUuid;
    
    return {
      uuid: finalUuid,
      timestamp: new Date().toISOString(),
      format: prefix ? 'suffixed' : 'standard'
    };
  }
};
