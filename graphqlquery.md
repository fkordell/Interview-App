# query to search for companies in graphql

query{
companies {
\_id
companyName
companyDescription
industryCategory
location{
address
city
state
country
}
contactInfo{
firstName
lastName
email
favoriteColor
birthday
}
websiteURL
}
}
