import * as awilix from 'awilix';
import { AwilixContainer, ContainerOptions } from 'awilix';
import { winstonLogger } from 'node-common';
import FileRepository from '../../infrastructure/repository/file.repository';
import InEnvStorage from '../../infrastructure/storage/in-env';
import InRedisStorage from '../../infrastructure/storage/in-redis';
import GoogleAuth from '../../shared/google/auth';
import GoogleSheets from '../../shared/google/sheets';
import MaskConverter from '../../shared/mask/mask.converter';
import MaskInput from '../../shared/mask/mask.input';
import TokenStorage from '../../shared/token/token';
import SpreadsheetToJsonTransformer from '../../shared/transformers/spreadsheet-to-json.transformer';
import MaskedTranslations from '../../shared/translations/masked-translations';

export default function createContainer(options?: ContainerOptions): AwilixContainer {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.CLASSIC,
    ...options,
  });

  container.register({
    fileRepository: awilix.asClass(FileRepository, { lifetime: awilix.Lifetime.SINGLETON }),
    googleAuth: awilix.asClass(GoogleAuth),
    googleSheets: awilix.asClass(GoogleSheets),
    inEnvStorage: awilix.asClass(InEnvStorage, { lifetime: awilix.Lifetime.SINGLETON }),
    logger: awilix.asValue(winstonLogger),
    maskConverter: awilix.asClass(MaskConverter),
    maskInput: awilix.asClass(MaskInput),
    port: awilix.asValue(process.env.PORT || 3000),
    storage: awilix.asClass(InRedisStorage),
    tokenStorage: awilix
      .asClass(TokenStorage)
      .inject(() => ({ storage: container.resolve<InEnvStorage>('inEnvStorage') })),
    transformer: awilix.asClass(SpreadsheetToJsonTransformer),
    translationsStorage: awilix.asClass(MaskedTranslations),
  });

  return container;
}
