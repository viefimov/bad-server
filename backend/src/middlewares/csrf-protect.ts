import { doubleCsrf } from 'csrf-csrf'
import { CSRF_SECRET, CSRF_COOKIE_NAME } from '../config'

const isProduction = process.env.NODE_ENV === 'production'

const csrfCookieOptions = {
    sameSite: 'strict' as const,
    secure: isProduction,
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
}

export const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } =
    doubleCsrf({
        getSecret: () => CSRF_SECRET,
        cookieName: CSRF_COOKIE_NAME,
        cookieOptions: csrfCookieOptions,
    })
