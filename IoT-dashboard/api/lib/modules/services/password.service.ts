import PasswordModel from '../schemas/password.schema';
import bcrypt from 'bcrypt';
class PasswordService {
    public async createOrUpdate(data: any) {
        const result = await PasswordModel.findOneAndUpdate({ userId: data.userId }, { $set: { password: data.password } }, { new: true });
        if (!result) {
            const dataModel = new PasswordModel({ userId: data.userId, password: data.password });
            return await dataModel.save();
        }
        return result;
    }

    async authorize(userId: string, plainPassword: string): Promise<boolean> {
        try {
            const record = await PasswordModel.findOne({ userId });
            if (!record) return false;

            const isMatch = await bcrypt.compare(plainPassword, record.password);
            return isMatch;
        } catch (error) {
            console.error(`Authorize Error: ${error.message}`);
            return false;
        }
    }


    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('hash', hashedPassword)
        return hashedPassword;
    }

}

export default PasswordService;
