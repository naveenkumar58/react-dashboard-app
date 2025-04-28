import Address from "./Address.types";
import Company from "./Company.types";

export default interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
