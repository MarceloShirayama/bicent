import { Id } from "@/logic/core/common/id";
import { User } from "@/logic/core/user/types";

export const fakeUser: User = {
    id: Id.new(),
    name: 'João Da Silva',
    email: 'joao@mail.com',
    imageUrl: null
}