library("googleAuthR")
library("googleAnalyticsR")

# From the main menu: "Session > Set Working Directory > To Source File Location"
# Load auth service credentials from a json file
# Make sure to retrieve the credentials from the Google Analytics Developer account,
# see https://github.com/Morphl-Project/MorphL-Tracking-Settings/tree/master/google-tag-manager (Step 4) for help.
json_file <- paste(c(getwd(),"/credentials/service-account.json"),collapse='')

# Set the required scope and authenticate
gar_auth_service(json_file, scope = getOption("googleAuthR.scopes.selected"))

##########################################################

# Pick the viewId you want to extract data from
ga_id <- "your_view_id_here (set as number)" # account_list$viewId

# Set dates interval
start_date <- "YYYY-MM-DD"
end_date <- "YYYY-MM-DD"

client_ids <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = "users",
  dimensions = c("dimension1"),
  anti_sample = TRUE,
  max = -1
)

# create filter by clientIds
dim1_filter <- dim_filter(
  dimension = "dimension1",
  operator = "IN_LIST",
  expressions = c(client_ids$dimension1)
)
dim1_filter_clause <- filter_clause_ga4(list(dim1_filter))

##########################################################

sessions <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  dimensions = c("dimension1", "dimension2", "sessionDurationBucket"),
  metrics = c("sessions"),
  dim_filters = dim1_filter_clause,
  anti_sample = TRUE,
  max = -1
)

sessions <- sessions[, -grep("sessions", names(sessions))]

# create filter by sessionIds
dim2_filter <- dim_filter(
  dimension = "dimension2",
  operator = "IN_LIST",
  expressions = c(sessions$dimension2)
  )
dim2_filter_clause <- filter_clause_ga4(list(dim2_filter))

##########################################################

all_platform_device <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c("users"),
  dimensions = c(
    "dimension1",
    "browser",
    "browserVersion",
    "operatingSystem",
    "operatingSystemVersion"),
  dim_filters = dim1_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

# Eliminate users column
all_platform_device <- all_platform_device[, -grep("users", names(all_platform_device))]

mobile_platform_device <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c("users"),
  dimensions = c(
    "dimension1",
    "mobileDeviceBranding",
    "mobileDeviceModel",
    "mobileInputSelector",
    "mobileDeviceInfo"),
  dim_filters = dim1_filter_clause,
  anti_sample = TRUE,
  max = -1
)

# Eliminate users column
mobile_platform_device <- mobile_platform_device[, -grep("users", names(mobile_platform_device))]

# Merge platform & device data
if (length(mobile_platform_device) > 0) {
  platform_device <- merge(all_platform_device, mobile_platform_device, by = c("dimension1"), all.x = TRUE)
} else {
  platform_device <- all_platform_device
}

##########################################################

system_data <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c("sessions"),
  dimensions = c("dimension1", "language", "screenResolution"),
  dim_filters = dim1_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

system_data <- system_data[, -grep("sessions", names(system_data))]

##########################################################

# create filter by goalCompletions > 0
goal_completions_filter <- met_filter("goalCompletionsAll", "GREATER_THAN", 0)
goal_completions_filter_clause <- filter_clause_ga4(list(goal_completions_filter))

goals_1_10 <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c(
    "goal1Completions",
    "goal2Completions",
    "goal3Completions",
    "goal4Completions",
    "goal5Completions",
    "goal6Completions",
    "goal7Completions",
    "goal8Completions",
    "goal9Completions",
    "goal10Completions"
  ),
  dimensions = c(
    "dimension1",
    "dimension2"
  ),
  dim_filters = dim1_filter_clause,
  met_filters = goal_completions_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

goals_11_20 <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c(
    "goal11Completions",
    "goal12Completions",
    "goal13Completions",
    "goal14Completions",
    "goal15Completions",
    "goal16Completions",
    "goal17Completions",
    "goal18Completions",
    "goal19Completions",
    "goal20Completions"
  ),
  dimensions = c(
    "dimension1",
    "dimension2"
  ),
  dim_filters = dim1_filter_clause,
  met_filters = goal_completions_filter_clause,
  anti_sample = TRUE,
  max = -1
)

goals <- merge(goals_1_10, goals_11_20, by = c("dimension1","dimension2"), all.x = TRUE)

##########################################################

events <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c(
    "sessions",
    "totalEvents",
    "eventValue",
    "sessionsWithEvent"
  ),
  dimensions = c(
    "dimension1",
    "dimension2",
    "eventCategory",
    "eventAction",
    "eventLabel",
    "pagePath"
  ),
  dim_filters = dim2_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

##########################################################

page_tracking <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c(
    "sessions",
    "pageValue",
    "entrances",
    "pageviews",
    "uniquePageviews",
    "timeOnPage",
    "exits"
  ),
  dimensions = c(
    "dimension1",
    "dimension2",
    "dimension3",
    "hostname",
    "pagePath",
    "landingPagePath",
    "secondPagePath",
    "exitPagePath",
    "previousPagePath"
  ),
  dim_filters = dim2_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

##########################################################

site_speed <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c(
    "sessions",
    "pageLoadTime",
    "pageLoadSample",
    "domainLookupTime",
    "pageDownloadTime",
    "redirectionTime",
    "serverConnectionTime",
    "serverResponseTime",
    "domInteractiveTime",
    "domContentLoadedTime"
  ),
  dimensions = c(
    "dimension1",
    "dimension2",
    "dimension3",
    "hostname",
    "pagePath",
    "landingPagePath",
    "secondPagePath",
    "exitPagePath",
    "previousPagePath"
  ),
  dim_filters = dim2_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

##########################################################

geo_content <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c("sessions"),
  dimensions = c(
    "dimension1",
    "dimension2",
    "continent",
    "country",
    "region",
    "city",
    "latitude",
    "longitude",
    "regionIsoCode"
  ),
  dim_filters = dim2_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

##########################################################

traffic_sources <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c("sessions"),
  dimensions = c(
    "dimension1",
    "dimension2",
    "referralPath",
    "fullReferrer",
    "source",
    "medium",
    "keyword",
    "socialNetwork",
    "hasSocialSourceReferral"
  ),
  dim_filters = dim2_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

traffic_sources <- traffic_sources[, -grep("sessions", names(traffic_sources))]

##########################################################

time <- google_analytics(
  ga_id,
  date_range = c(start_date, end_date),
  metrics = c("sessions"),
  dimensions = c(
    "dimension1",
    "dimension2",
    "dateHourMinute"
  ),
  dim_filters = dim2_filter_clause,
  anti_sample = TRUE,
  max = -1
  )

##########################################################

all_ga_data <- merge(client_ids, sessions, by = "dimension1", all.x = TRUE);
all_ga_data <- merge(all_ga_data, page_tracking, by = c("dimension1","dimension2"), all.x = TRUE, no.dupes=FALSE);
all_ga_data <- merge(all_ga_data, events, by = c("dimension1","dimension2","pagePath"), all.x = TRUE, no.dupes=FALSE);
all_ga_data <- merge(all_ga_data, geo_content, by = c("dimension1","dimension2"), all.x = TRUE, no.dupes=FALSE);
all_ga_data <- merge(all_ga_data, goals, by = c("dimension1","dimension2"), all.x = TRUE, all.y = FALSE, no.dupes=FALSE);
all_ga_data <- merge(all_ga_data, platform_device, by = "dimension1", all.x = TRUE, no.dupes=FALSE);
all_ga_data <- merge(all_ga_data, system_data, by = "dimension1", all.x = TRUE, no.dupes=FALSE);
all_ga_data <- merge(all_ga_data, traffic_sources, by = c("dimension1","dimension2"), all.x = TRUE, no.dupes=FALSE);

destination_file <- paste(c(getwd(),"/data/ga-", ga_id, '-', start_date, '-', end_date, '.csv'),collapse='')

write.csv(
  all_ga_data,
  file = destination_file,
  quote = TRUE,
  eol = "\n",
  na = "",
  row.names = TRUE,
  fileEncoding = ""
)
