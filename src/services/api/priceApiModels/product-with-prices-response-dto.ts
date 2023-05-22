/* tslint:disable */
/* eslint-disable */
/**
 * APPriceit
 * API description
 *
 * The version of the OpenAPI document: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { PriceResponseDto } from './price-response-dto';

/**
 * 
 * @export
 * @interface ProductWithPricesResponseDTO
 */
export interface ProductWithPricesResponseDTO {
    /**
     * 
     * @type {Array<PriceResponseDto>}
     * @memberof ProductWithPricesResponseDTO
     */
    'product_prices': Array<PriceResponseDto>;
    /**
     * 
     * @type {number}
     * @memberof ProductWithPricesResponseDTO
     */
    'product_id': number;
    /**
     * 
     * @type {string}
     * @memberof ProductWithPricesResponseDTO
     */
    'product_name': string;
    /**
     * 
     * @type {string}
     * @memberof ProductWithPricesResponseDTO
     */
    'product_description'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductWithPricesResponseDTO
     */
    'product_creation_time': string;
    /**
     * 
     * @type {number}
     * @memberof ProductWithPricesResponseDTO
     */
    'product_appuser_id': number;
}

