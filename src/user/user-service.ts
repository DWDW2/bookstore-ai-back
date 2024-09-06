import { CreateUserDto } from './dtos/CreateUser.dto';
import User, {IUser} from './models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  async createUser(userDto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = new User({
      email: userDto.email,
      username: userDto.username || 'user',
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }
    return null;
  }
}

export default UserService;