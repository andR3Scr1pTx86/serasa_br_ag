const { execSync } = require('child_process');

const command = `npx prisma migrate dev --name init --schema prisma/schema.prisma`;

try {
    execSync(command, { stdio: 'inherit' });
} catch (error) {
    console.error('Prisma Migrate failed.', error);
    process.exit(1);
}