import { User, Propiedade } from "@/payload-types";


export interface ApiResponse<T> {
	code: number;
	message: string;
	data: T | null;
  }


export interface EntityModelUserType {
	Users: User[];
}

export interface EntityModelPropiedadesType {
	Propiedades: Propiedade[];
}


export type EntityModelType =  EntityModelUserType & EntityModelPropiedadesType;

export type KeyEntityModelType = keyof EntityModelType;

export type ExtendsKeyEntityModelType<T extends KeyEntityModelType> =
	// Administration
	
		T extends "Users"
		? User
		: T extends "Propiedades"
		? Propiedade
		: never;		



		// : T extends "AdministrationBankAccount"
		// 	? AdministrationBankAccountModelType
		// 	: T extends "AdministrationSupplierCategories"
		// 		? AdministrationSupplierCategoriesModelType
		// 		: T extends "AdministrationSupplierType"
		// 			? AdministrationSupplierTypeModelType
		// 			: never;		
					

export interface ModelType<
	KeyT extends KeyEntityModelType,
	EndpointT,
	SchemaT,
> {
	key: KeyT;
	endpoint: EndpointT;
	schema: SchemaT;
}
