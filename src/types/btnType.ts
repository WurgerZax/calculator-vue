import BtnSpeciality from "./btnSpeciality"

interface Button{
  type: number | string,
  width: string,
  special: BtnSpeciality
}

export default Button;