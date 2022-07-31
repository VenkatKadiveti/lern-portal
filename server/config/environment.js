const env = process.env;

const envVariables = {
    DISCUSSIONS_MW_URL: env.DISCUSSIONS_MW_URL || 'http://localhost:3002',
    DMW_SESSION_SECRET_KEY: env.DMW_SESSION_SECRET_KEY || 'secret',
    DMW_SESSION_TTL: env.DMW_SESSION_TTL || (24 * 60 * 60 * 1000)
}

module.exports = envVariables;