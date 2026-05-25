// Site-wide constants that are not (yet) backed by a database table or admin
// UI. Products, services, and projects now live in the database — seed them
// with `npm run seed:content` and edit them in the admin panel.
//
// `stats` and `countries` remain here because there is no table/admin screen
// for them yet; add one if the client needs to edit these numbers.

export const stats = {
  yearsOfOperation: 25,
  countriesServed: 12,
  b2bClients: 350,
  foundedYear: 2000,
};

export const countries = [
  'Australia',
  'Canada',
  'Germany',
  'USA',
  'Singapore',
  'Malaysia',
  'Kenya',
  'Nigeria',
  'Sri Lanka',
  'Chile',
  'Namibia',
  'India',
];
