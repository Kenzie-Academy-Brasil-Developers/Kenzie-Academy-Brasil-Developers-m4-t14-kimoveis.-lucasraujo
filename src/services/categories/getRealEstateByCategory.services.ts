import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { RealEstate } from "../../entities/realEstate.entities";

const getRealEstateByCategoryServices = async (request: Request) => {
  const idRequest = request.params.id;

  const categoryRepository = AppDataSource.getRepository(Category);

  const resp = categoryRepository
    .createQueryBuilder("category")
    .select(["category", "realEstate"])
    .innerJoin("category.realEstate", "realEstate")
    .where("category.id = :id", { id: idRequest })
    .getOne();

  return resp;
};

export { getRealEstateByCategoryServices };
