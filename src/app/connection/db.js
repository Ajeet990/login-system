// This file is used to create connection with the db and only one 
// instance at a time will be running.


const { PrismaClient } = require('@prisma/client');

// Create a PrismaClient instance with logging enabled
const prismaClientSingleton = () => {
     return new PrismaClient();


  // return new PrismaClient({
  //   log: ['query', 'info', 'warn', 'error'], // Enable query logging
  // });

};

// Ensure globalThis or global object is used appropriately
const globalObject = typeof globalThis !== 'undefined' ? globalThis : global;
const prisma = globalObject.prismaGlobal || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalObject.prismaGlobal = prisma;
}

module.exports = prisma;

