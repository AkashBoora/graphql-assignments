const users: Record<
    string,
    {
        id:number;
        password:string;
        todos: string[]
    }
> = {
    akash: {
        id: 1,
        password: "123",
        todos: ["Agaile WorkShop","Authentication"]
    },
    boora: {
        id: 2,
        password: "456",
        todos: ["JWT","Logging"]
    }
}

export default users;