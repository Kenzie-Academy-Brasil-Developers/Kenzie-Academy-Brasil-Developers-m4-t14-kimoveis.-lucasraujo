import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities/realEstate.entities";

const getAllRealEstateServices = async () => {
  const realEstateRepository = AppDataSource.getRepository(RealEstate);

  let allRealEstate = await realEstateRepository
    .createQueryBuilder("realEstate")
    .select(["realEstate", "realEstate_address"])
    .innerJoin("realEstate.address", "realEstate_address")
    .getMany();

  allRealEstate.forEach(
    (elem) =>
      (elem.value =
        elem.value.toString().split(".")[1].length === 1
          ? elem.value.toString() + "0"
          : elem.value.toString())
  );

  return allRealEstate;
};
export { getAllRealEstateServices };
