import {describe, expect, test} from '@jest/globals';
import { Account } from "../../../src/application/models/Account.js";

describe("An account", () => {
    test('must have a strong password', () => {
        const account = new Account("chad", "test1234$");
        account.setPassword("1234$test");
        expect(account.getState().password).toBe("1234$test");
    });
});