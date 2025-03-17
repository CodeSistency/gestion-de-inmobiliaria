import { ModelType } from "../types";
import { EndpointType, endpoint } from "./endpoint";
import { SchemaType, schema } from "./schema";

const key = "Propiedades";

export const PropiedadesModel: ModelType<
	typeof key,
	EndpointType,
	SchemaType
> = {
	key,
	endpoint,
	schema,
};
