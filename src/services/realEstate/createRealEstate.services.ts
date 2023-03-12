import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/addresses.entities";
import { Category } from "../../entities/categories.entities";
import { RealEstate } from "../../entities/realEstate.entities";
import { AppError } from "../../error";
import {
  realEstateSchema,
  realEstateWithoutAddressSchema,
} from "../../schemas/realEstate.schema";

const createRealEstateService = async (request: Request) => {
  const reqBody = realEstateSchema.parse(request.body);
  const address = reqBody.address;
  const idOfCategory = Number(reqBody.categoryId);
  const isAdmin = request.user.admin;
  const realEstateRepository = AppDataSource.getRepository(RealEstate);
  const adressesRepository = AppDataSource.getRepository(Address);
  const categoryRepository = AppDataSource.getRepository(Category);

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const category = await categoryRepository.findOne({
    where: {
      id: idOfCategory,
    },
  });

  if (!category) {
    throw new AppError("category not found", 404);
  }

  let realEstate;
  if (address) {
    const addressExists = await adressesRepository
      .createQueryBuilder("address")
      .select(["address"])
      .where("address.street = :street", { street: address.street })
      .andWhere("address.zipCode = :zipCode", { zipCode: address.zipCode })
      .getOne();

    if (addressExists != null) {
      throw new AppError("Address already exists", 409);
    }

    const adressCreate = adressesRepository.create(address);
    const adressSave = await adressesRepository.save(adressCreate);
    const createBody = realEstateWithoutAddressSchema.parse(reqBody);
    realEstate = realEstateRepository.create({
      ...createBody,
      category: category,
      address: adressSave,
    });
  } else {
    const createBody = realEstateWithoutAddressSchema.parse(reqBody);

    realEstate = realEstateRepository.create({
      ...createBody,
      category: category,
    });
  }

  await realEstateRepository.save(realEstate);

  return realEstate;
};

export { createRealEstateService };
