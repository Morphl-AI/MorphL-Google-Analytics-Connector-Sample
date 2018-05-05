/*
* https://developers.google.com/analytics/devguides/reporting/core/dimsmets
*/

export const adwordsDimensions = [
  'ga:adGroup',
  'ga:adSlot',
  'ga:adDistributionNetwork',
  'ga:adMatchType',
  'ga:adKeywordMatchType',
  'ga:adMatchedQuery',
  'ga:adPlacementDomain',
  'ga:adPlacementUrl',
  'ga:adFormat',
  'ga:adTargetingType',
  'ga:adTargetingOption',
  'ga:adDisplayUrl',
  'ga:adDestinationUrl',
  'ga:adwordsCustomerID',
  'ga:adwordsCampaignID',
  'ga:adwordsAdGroupID',
  'ga:adwordsCreativeID',
  'ga:adwordsCriteriaID',
  'ga:adQueryWordCount',
  'ga:isTrueViewVideoAd',
];

export const adwordsMetrics = [
  'ga:impressions',
  'ga:adClicks',
  'ga:adCost',
  'ga:CPM',
  'ga:CPC',
  'ga:CTR',
  'ga:costPerTransaction',
  'ga:costPerGoalConversion',
  'ga:costPerConversion',
  'ga:RPC',
  'ga:ROAS',
];

export const geoNetworkDimensions = [
  'ga:continent',
  // 'ga:subContinent',
  'ga:country',
  'ga:region',
  // 'ga:metro',
  'ga:city',
  'ga:latitude',
  'ga:longitude',
  // 'ga:networkDomain',
  // 'ga:networkLocation',
  // 'ga:cityId',
  // 'ga:continentId',
  // 'ga:countryIsoCode',
  // 'ga:metroId',
  // 'ga:regionId',
  'ga:regionIsoCode',
  // 'ga:subContinentCode',
];

export const systemDimensions = [
  // 'ga:flashVersion',
  // 'ga:javaEnabled',
  'ga:language',
  // 'ga:screenColors',
  // 'ga:sourcePropertyDisplayName',
  // 'ga:sourcePropertyTrackingId', // breaks when we add this one
  'ga:screenResolution',
];

export const pageTrackingDimensions = [
  'ga:hostname',
  'ga:pagePath',
  // 'ga:pagePathLevel1',
  // 'ga:pagePathLevel2',
  // 'ga:pagePathLevel3',
  // 'ga:pagePathLevel4',
  // 'ga:pageTitle',
  'ga:landingPagePath',
  'ga:secondPagePath',
  'ga:exitPagePath',
  'ga:previousPagePath',
  'ga:pageDepth',
];

export const pageTrackingMetrics = [
  'ga:pageValue',
  'ga:entrances',
  'ga:entranceRate',
  'ga:pageviews',
  'ga:pageviewsPerSession',
  'ga:uniquePageviews',
  'ga:timeOnPage',
  'ga:avgTimeOnPage',
  'ga:exits',
  'ga:exitRate',
];

// @todo Get content groups first?
// const contentGroupingDimensions = ['ga:landingContentGroupXX', 'ga:previousContentGroupXX', 'ga:contentGroupXX'];

// const contentGroupingMetrics = ['ga:contentGroupUniqueViewsXX'];

export const internalSearchDimensions = [
  'ga:searchUsed',
  'ga:searchKeyword', // breaks when using this one
  'ga:searchKeywordRefinement',
  'ga:searchCategory', // breaks when using this one
  'ga:searchStartPage', // breaks when using this one
  'ga:searchDestinationPage',
  'ga:searchAfterDestinationPage',
];

export const internalSearchMetrics = [
  'ga:searchResultViews',
  'ga:searchUniques',
  'ga:avgSearchResultViews',
  'ga:searchSessions',
  'ga:percentSessionsWithSearch',
  'ga:searchDepth',
  'ga:avgSearchDepth',
  'ga:searchRefinements',
  'ga:percentSearchRefinements',
  'ga:searchDuration',
  'ga:avgSearchDuration',
  'ga:searchExits',
  'ga:searchExitRate',
  'ga:searchGoalXXConversionRate',
  'ga:searchGoalConversionRateAll',
  'ga:goalValueAllPerSearch',
];

export const siteSpeedMetrics = [
  'ga:pageLoadTime',
  'ga:pageLoadSample',
  // 'ga:avgPageLoadTime', // calculated metric
  'ga:domainLookupTime',
  // 'ga:avgDomainLookupTime', // calculated metric
  'ga:pageDownloadTime',
  // 'ga:avgPageDownloadTime', // calculated metric
  'ga:redirectionTime',
  // 'ga:avgRedirectionTime', // calculated metric
  'ga:serverConnectionTime',
  // 'ga:avgServerConnectionTime', // calculated metric
  'ga:serverResponseTime',
  // 'ga:avgServerResponseTime', // calculated metric
  'ga:speedMetricsSample',
  'ga:domInteractiveTime',
  // 'ga:avgDomInteractiveTime', // calculated metric
  'ga:domContentLoadedTime',
  // 'ga:avgDomContentLoadedTime', // calculated metric
  'ga:domLatencyMetricsSample',
];

// export const appTrackingDimensions = [
//   'ga:appInstallerId',
//   'ga:appVersion',
//   'ga:appName',
//   'ga:appId',
//   'ga:screenName',
//   'ga:screenDepth',
//   'ga:landingScreenName',
//   'ga:exitScreenName',
// ];

// export const appTrackingMetrics = [
//   'ga:screenviews',
//   'ga:uniqueScreenviews',
//   'ga:screenviewsPerSession',
//   'ga:timeOnScreen',
//   'ga:avgScreenviewDuration',
// ];

export const eventTrackingDimensions = ['ga:eventCategory', 'ga:eventAction', 'ga:eventLabel'];

export const eventTrackingMetrics = [
  'ga:totalEvents',
  'ga:uniqueEvents',
  'ga:eventValue',
  // 'ga:avgEventValue',
  'ga:sessionsWithEvent',
  'ga:eventsPerSessionWithEvent',
];

export const ecommerceDimensions = [
  'ga:transactionId',
  'ga:affiliation',
  'ga:sessionsToTransaction',
  'ga:daysToTransaction',
  'ga:productSku',
  'ga:productName',
  'ga:productCategory',
  'ga:currencyCode',
  'ga:checkoutOptions',
  'ga:internalPromotionCreative',
  'ga:internalPromotionId',
  'ga:internalPromotionName',
  'ga:internalPromotionPosition',
  'ga:orderCouponCode',
  'ga:productBrand',
  'ga:productCategoryHierarchy',
  'ga:productCategoryLevelXX',
  'ga:productCouponCode',
  'ga:productListName',
  'ga:productListPosition',
  'ga:productVariant',
  'ga:shoppingStage',
];

export const ecommerceMetrics = [
  'ga:transactions',
  // 'ga:transactionsPerSession',
  'ga:transactionRevenue',
  // 'ga:revenuePerTransaction',
  // 'ga:transactionRevenuePerSession',
  'ga:transactionShipping',
  'ga:transactionTax',
  'ga:totalValue',
  'ga:itemQuantity',
  'ga:uniquePurchases',
  // 'ga:revenuePerItem',
  'ga:itemRevenue',
  // 'ga:itemsPerPurchase',
  'ga:localTransactionRevenue',
  'ga:localTransactionShipping',
  'ga:localTransactionTax',
  'ga:localItemRevenue',
  'ga:buyToDetailRate',
  'ga:cartToDetailRate',
  'ga:internalPromotionCTR',
  'ga:internalPromotionClicks',
  'ga:internalPromotionViews',
  'ga:localProductRefundAmount',
  'ga:localRefundAmount',
  'ga:productAddsToCart',
  'ga:productCheckouts',
  'ga:productDetailViews',
  'ga:productListCTR',
  'ga:productListClicks',
  'ga:productListViews',
  'ga:productRefundAmount',
  'ga:productRefunds',
  'ga:productRemovesFromCart',
  'ga:productRevenuePerPurchase',
  'ga:quantityAddedToCart',
  'ga:quantityCheckedOut',
  'ga:quantityRefunded',
  'ga:quantityRemovedFromCart',
  'ga:refundAmount',
  // 'ga:revenuePerUser',
  // 'ga:totalRefunds',
  // 'ga:transactionsPerUser',
];

export const socialInteractionsDimensions = [
  'ga:socialInteractionNetwork',
  'ga:socialInteractionAction',
  'ga:socialInteractionNetworkAction',
  'ga:socialInteractionTarget',
  'ga:socialEngagementType',
];

export const socialInteractionsMetrics = [
  'ga:socialInteractions',
  'ga:uniqueSocialInteractions',
  // 'ga:socialInteractionsPerSession', // calculated metric
];

// export const userTimingsDimensions = ['ga:userTimingCategory', 'ga:userTimingLabel', 'ga:userTimingVariable'];

// export const userTimingsMetrics = ['ga:userTimingValue', 'ga:userTimingSample', 'ga:avgUserTimingValue'];

// export const exceptionsDimensions = ['ga:exceptionDescription'];

// export const exceptionsMetrics = ['ga:exceptions', 'ga:exceptionsPerScreenview', 'ga:fatalExceptions', 'ga:fatalExceptionsPerScreenview'];

export const contentExperimentsDimensions = ['ga:experimentId', 'ga:experimentVariant'];

export const timeDimensions = [
  // 'ga:date',
  // 'ga:year',
  // 'ga:month',
  // 'ga:week',
  // 'ga:day',
  // 'ga:hour',
  // 'ga:minute',
  // 'ga:nthMonth',
  // 'ga:nthWeek',
  // 'ga:nthDay',
  // 'ga:nthMinute',
  // 'ga:dayOfWeek',
  // 'ga:dayOfWeekName',
  // 'ga:dateHour',
  'ga:dateHourMinute',
  // 'ga:yearMonth',
  // 'ga:yearWeek',
  // 'ga:isoWeek',
  // 'ga:isoYear',
  // 'ga:isoYearIsoWeek',
  // 'ga:nthHour',
];

// export const doubleClickCampaignManagerDimensions = [
//   'ga:dcmClickAd',
//   'ga:dcmClickAdId',
//   'ga:dcmClickAdType',
//   'ga:dcmClickAdTypeId',
//   'ga:dcmClickAdvertiser',
//   'ga:dcmClickAdvertiserId',
//   'ga:dcmClickCampaign',
//   'ga:dcmClickCampaignId',
//   'ga:dcmClickCreativeId',
//   'ga:dcmClickCreative',
//   'ga:dcmClickRenderingId',
//   'ga:dcmClickCreativeType',
//   'ga:dcmClickCreativeTypeId',
//   'ga:dcmClickCreativeVersion',
//   'ga:dcmClickSite',
//   'ga:dcmClickSiteId',
//   'ga:dcmClickSitePlacement',
//   'ga:dcmClickSitePlacementId',
//   'ga:dcmClickSpotId',
//   'ga:dcmFloodlightActivity',
//   'ga:dcmFloodlightActivityAndGroup',
//   'ga:dcmFloodlightActivityGroup',
//   'ga:dcmFloodlightActivityGroupId',
//   'ga:dcmFloodlightActivityId',
//   'ga:dcmFloodlightAdvertiserId',
//   'ga:dcmFloodlightSpotId',
//   'ga:dcmLastEventAd',
//   'ga:dcmLastEventAdId',
//   'ga:dcmLastEventAdType',
//   'ga:dcmLastEventAdTypeId',
//   'ga:dcmLastEventAdvertiser',
//   'ga:dcmLastEventAdvertiserId',
//   'ga:dcmLastEventAttributionType',
//   'ga:dcmLastEventCampaign',
//   'ga:dcmLastEventCampaignId',
//   'ga:dcmLastEventCreativeId',
//   'ga:dcmLastEventCreative',
//   'ga:dcmLastEventRenderingId',
//   'ga:dcmLastEventCreativeType',
//   'ga:dcmLastEventCreativeTypeId',
//   'ga:dcmLastEventCreativeVersion',
//   'ga:dcmLastEventSite',
//   'ga:dcmLastEventSiteId',
//   'ga:dcmLastEventSitePlacement',
//   'ga:dcmLastEventSitePlacementId',
//   'ga:dcmLastEventSpotId',
// ];

// export const doubleClickCampaignManagerMetrics = [
//   'ga:dcmFloodlightQuantity',
//   'ga:dcmFloodlightRevenue',
//   'ga:dcmCPC',
//   'ga:dcmCTR',
//   'ga:dcmClicks',
//   'ga:dcmCost',
//   'ga:dcmImpressions',
//   'ga:dcmROAS',
//   'ga:dcmRPC',
// ];

export const audienceDimensions = [
  'ga:userAgeBracket',
  'ga:userGender',
  'ga:interestOtherCategory',
  'ga:interestAffinityCategory',
  'ga:interestInMarketCategory',
];

export const adSenseMetrics = [
  'ga:adsenseRevenue',
  'ga:adsenseAdUnitsViewed',
  'ga:adsenseAdsViewed',
  'ga:adsenseAdsClicks',
  'ga:adsensePageImpressions',
  'ga:adsenseCTR',
  'ga:adsenseECPM',
  'ga:adsenseExits',
  'ga:adsenseViewableImpressionPercent',
  'ga:adsenseCoverage',
];

export const adExchangeMetrics = [
  'ga:adxImpressions',
  'ga:adxCoverage',
  'ga:adxMonetizedPageviews',
  'ga:adxImpressionsPerSession',
  'ga:adxViewableImpressionsPercent',
  'ga:adxClicks',
  'ga:adxCTR',
  'ga:adxRevenue',
  'ga:adxRevenuePer1000Sessions',
  'ga:adxECPM',
];

// export const doubleClickForPublishersMetrics = [
//   'ga:dfpImpressions',
//   'ga:dfpCoverage',
//   'ga:dfpMonetizedPageviews',
//   'ga:dfpImpressionsPerSession',
//   'ga:dfpViewableImpressionsPercent',
//   'ga:dfpClicks',
//   'ga:dfpCTR',
//   'ga:dfpRevenue',
//   'ga:dfpRevenuePer1000Sessions',
//   'ga:dfpECPM',
// ];

// export const doubleClickForPublishersBackfillMetrics = [
//   'ga:backfillImpressions',
//   'ga:backfillCoverage',
//   'ga:backfillMonetizedPageviews',
//   'ga:backfillImpressionsPerSession',
//   'ga:backfillViewableImpressionsPercent',
//   'ga:backfillClicks',
//   'ga:backfillCTR',
//   'ga:backfillRevenue',
//   'ga:backfillRevenuePer1000Sessions',
//   'ga:backfillECPM',
// ];

export const lifetimeValueAndCohortsDimensions = [
  'ga:acquisitionCampaign',
  'ga:acquisitionMedium',
  'ga:acquisitionSource',
  // 'ga:acquisitionSourceMedium', // calculated metric
  'ga:acquisitionTrafficChannel',
  'ga:cohort',
  'ga:cohortNthDay',
  'ga:cohortNthMonth',
  'ga:cohortNthWeek',
];

// aggregated metrics
// export const lifetimeValueAndCohortsMetrics = [
//   'ga:cohortActiveUsers',
//   'ga:cohortAppviewsPerUser',
//   'ga:cohortAppviewsPerUserWithLifetimeCriteria',
//   'ga:cohortGoalCompletionsPerUser',
//   'ga:cohortGoalCompletionsPerUserWithLifetimeCriteria',
//   'ga:cohortPageviewsPerUser',
//   'ga:cohortPageviewsPerUserWithLifetimeCriteria',
//   'ga:cohortRetentionRate',
//   'ga:cohortRevenuePerUser',
//   'ga:cohortRevenuePerUserWithLifetimeCriteria',
//   'ga:cohortSessionDurationPerUser',
//   'ga:cohortSessionDurationPerUserWithLifetimeCriteria',
//   'ga:cohortSessionsPerUser',
//   'ga:cohortSessionsPerUserWithLifetimeCriteria',
//   'ga:cohortTotalUsers',
//   'ga:cohortTotalUsersWithLifetimeCriteria',
// ];

// export const channelGroupingDimensions = ['ga:channelGrouping'];

// export const doubleClickBidManagerDimensions = [
//   'ga:dbmClickAdvertiser',
//   'ga:dbmClickAdvertiserId',
//   'ga:dbmClickCreativeId',
//   'ga:dbmClickExchange',
//   'ga:dbmClickExchangeId',
//   'ga:dbmClickInsertionOrder',
//   'ga:dbmClickInsertionOrderId',
//   'ga:dbmClickLineItem',
//   'ga:dbmClickLineItemId',
//   'ga:dbmClickSite',
//   'ga:dbmClickSiteId',
//   'ga:dbmLastEventAdvertiser',
//   'ga:dbmLastEventAdvertiserId',
//   'ga:dbmLastEventCreativeId',
//   'ga:dbmLastEventExchange',
//   'ga:dbmLastEventExchangeId',
//   'ga:dbmLastEventInsertionOrder',
//   'ga:dbmLastEventInsertionOrderId',
//   'ga:dbmLastEventLineItem',
//   'ga:dbmLastEventLineItemId',
//   'ga:dbmLastEventSite',
//   'ga:dbmLastEventSiteId',
// ];

// export const doubleClickBidManagerMetrics = [
//   'ga:dbmCPA',
//   'ga:dbmCPC',
//   'ga:dbmCPM',
//   'ga:dbmCTR',
//   'ga:dbmClicks',
//   'ga:dbmConversions',
//   'ga:dbmCost',
//   'ga:dbmImpressions',
//   'ga:dbmROAS',
// ];

// export const doubleClickSearchDimensions = [
//   'ga:dsAdGroup',
//   'ga:dsAdGroupId',
//   'ga:dsAdvertiser',
//   'ga:dsAdvertiserId',
//   'ga:dsAgency',
//   'ga:dsAgencyId',
//   'ga:dsCampaign',
//   'ga:dsCampaignId',
//   'ga:dsEngineAccount',
//   'ga:dsEngineAccountId',
//   'ga:dsKeyword',
//   'ga:dsKeywordId',
// ];

// export const doubleClickSearchMetrics = [
//   'ga:dsCPC',
//   'ga:dsCTR',
//   'ga:dsClicks',
//   'ga:dsCost',
//   'ga:dsImpressions',
//   'ga:dsProfit',
//   'ga:dsReturnOnAdSpend',
//   'ga:dsRevenuePerClick',
// ];

export default {
  sessionDimensions,
  trafficSourcesDimensions,
  trafficSourcesMetrics,
  adwordsDimensions,
  adwordsMetrics,
  goalConversionsDimensions,
  goalConversionsMetrics,
  platformDimensions,
  geoNetworkDimensions,
  systemDimensions,
  pageTrackingDimensions,
  pageTrackingMetrics,
  internalSearchDimensions,
  internalSearchMetrics,
  siteSpeedMetrics,
  eventTrackingDimensions,
  eventTrackingMetrics,
  ecommerceDimensions,
  ecommerceMetrics,
  socialInteractionsDimensions,
  socialInteractionsMetrics,
  contentExperimentsDimensions,
  timeDimensions,
  audienceDimensions,
  adSenseMetrics,
  adExchangeMetrics,
  lifetimeValueAndCohortsDimensions,
};
