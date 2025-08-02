const dotenv = require('dotenv');
const path = require('path');

const { execSync } = require('child_process');

dotenv.config({ path: path.resolve(__dirname, '.env.test') });

const command = `npx prisma migrate dev --name init --schema prisma/schema.prisma`;

try {
    execSync(command, { stdio: 'inherit' });
} catch (error) {
    console.error('Prisma Migrate failed.', error);
    process.exit(1);
}