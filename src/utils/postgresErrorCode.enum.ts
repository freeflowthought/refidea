//unique error code for Postgres (i.e no duplicate user for registration)
enum PostgresErrorCode {
    UniqueViolation = '23505'
}

export default PostgresErrorCode;