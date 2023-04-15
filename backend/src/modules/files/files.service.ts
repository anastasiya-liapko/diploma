import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
const XLSX = require('xlsx');
const path = require('path');

@Injectable()
export class FilesService {
  public async upload(file: File): Promise<boolean> {
    console.log('file', file);
    return true;
  }
  //   constructor(
  //     @InjectModel('Card') private readonly cardModel: Model<Card>,
  //     @InjectModel('Certificate')
  //     private readonly certificateModel: Model<Certificate>,
  //     @InjectModel('Point') private readonly pointModel: Model<Point>,
  //     @InjectModel('Sold') private readonly soldModel: Model<Sold>,
  //     @InjectModel('Promocode') private readonly promocodeModel: Model<Promocode>,
  //     private remoteService: RemoteService,
  //     @Inject(forwardRef(() => IntegrationService))
  //     private integrationService: IntegrationService,
  //   ) {}
  //   private onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  //   }
  //   private convertStringToArray(value: string): any {
  //     return value ? value.split(';').map((el) => el.trim()) : value;
  //   }
  //   private generateToken(token): string {
  //     return Buffer.from(token).toString('base64');
  //   }
  //   private getJson(file: any) {
  //     let res = [];
  //     const wb = XLSX.read(file.buffer, { type: 'buffer' });
  //     wb.SheetNames.some((sheetName) => {
  //       if (!process.env.SECTIONS.split(';').includes(sheetName)) return false;
  //       const ws = wb.Sheets[sheetName];
  //       const data = XLSX.utils.sheet_to_json(ws);
  //       data.every((el) => (el.section = sheetName));
  //       res = res.concat(data);
  //     });
  //     if (!res.length) {
  //       Logger.log(
  //         `Не найдены excel листы с названиями: ${process.env.SECTIONS.split(
  //           ';',
  //         ).join(', ')}.`,
  //       );
  //       throw new HttpException(
  //         {
  //           statusCode: 1,
  //           message: `Не найдены excel листы с названиями: ${process.env.SECTIONS.split(
  //             ';',
  //           ).join(', ')}.`,
  //         },
  //         500,
  //       );
  //     }
  //     return res;
  //   }
  //   private getJsonPromocodes(file: any) {
  //     const wb = XLSX.read(file.buffer, { type: 'buffer' });
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     // let data = XLSX.utils.sheet_to_json(ws, {defval: ''})
  //     const data = XLSX.utils.sheet_to_json(ws);
  //     return data;
  //   }
  //   async parseFile(data: any): Promise<any> {
  //     const cards = [];
  //     const certificates = [];
  //     let id = 1; // beautiful id for cards
  //     const newDate = new Date();
  //     const date = new Date(
  //       newDate.getTime() - newDate.getTimezoneOffset() * 60000,
  //     );
  //     const sold = await this.soldModel.find();
  //     // Lamoda integration
  //     const lamodaCertificatesDB = await this.certificateModel.find({
  //       integration: 'lamoda',
  //     });
  //     const newLamodaCertificates = [];
  //     // Load buka certificates
  //     await this.integrationService.loadBukaCertificates('full');
  //     for (const el of data) {
  //       const {
  //         section,
  //         sort,
  //         name,
  //         jpg_url,
  //         status,
  //         category,
  //         subcategory,
  //         platform,
  //         benefit,
  //         partner,
  //         partner_url,
  //         how_to,
  //         how_to_mail,
  //         activation_code,
  //         nominal,
  //         prices,
  //         subscription,
  //         description,
  //         description_mail,
  //         bonus_description,
  //         bonus,
  //         to_date,
  //         activation_date,
  //         duration,
  //         product_code,
  //         terminal_code,
  //         graph_code,
  //         currency,
  //         limitation,
  //         pin_code,
  //         purchase_interval,
  //         expires_in,
  //         integration,
  //         ean,
  //         sidn,
  //         infinity,
  //       } = el;
  //       if (integration) {
  //         if (!['softclub', 'lamoda', 'buka', 'letual'].includes(integration)) {
  //           Logger.log(
  //             `В поле integration может быть указано только softclub, lamoda, buka, letual .`,
  //           );
  //           throw new HttpException(
  //             {
  //               statusCode: 10,
  //               message: `В поле integration может быть указано только softclub, lamoda, buka, letual.`,
  //             },
  //             500,
  //           );
  //         }
  //         if (
  //           integration &&
  //           integration !== 'buka' &&
  //           (!name ||
  //             nominal === undefined ||
  //             nominal === null ||
  //             !ean ||
  //             !terminal_code)
  //         ) {
  //           Logger.log(
  //             'Поля обязательны для заполнения: name, nominal, ean, terminal_code.',
  //           );
  //           throw new HttpException(
  //             {
  //               statusCode: 11,
  //               message: `Поля обязательны для заполнения: name, nominal, ean, terminal_code.`,
  //             },
  //             500,
  //           );
  //         }
  //         if (integration === 'softclub' && !sidn) {
  //           Logger.log(`Полe sidn обязательно для заполнения.`);
  //           throw new HttpException(
  //             {
  //               statusCode: 12,
  //               message: `Полe sidn обязательно для заполнения.`,
  //             },
  //             500,
  //           );
  //         }
  //         if (integration === 'lamoda' && nominal < 1000) {
  //           throw new HttpException(
  //             {
  //               statusCode: 16,
  //               message: `Для интеграции ламоды, номинал сертификата должен быть больше 1000р`,
  //             },
  //             500,
  //           );
  //         }
  //       } else {
  //         if (
  //           !name ||
  //           nominal === undefined ||
  //           nominal === null ||
  //           !activation_code ||
  //           !terminal_code
  //         ) {
  //           Logger.log(
  //             'Поля обязательны для заполнения: name, nominal, activation_code, terminal_code.',
  //           );
  //           throw new HttpException(
  //             {
  //               statusCode: 13,
  //               message: `Поля обязательны для заполнения: name, nominal, activation_code, terminal_code.`,
  //             },
  //             500,
  //           );
  //         }
  //       }
  //       if (graph_code && !activation_code) {
  //         Logger.log(
  //           `Невозможно сгенерировать штрихкод для сертификата '${name}'. Отсутствует activation_code.`,
  //         );
  //         throw new HttpException(
  //           {
  //             statusCode: 14,
  //             message: `Невозможно сгенерировать штрихкод для сертификата '${name}'. Отсутствует activation_code.`,
  //           },
  //           500,
  //         );
  //       }
  //       if (currency && !['star', 'bonus', 'cash'].includes(currency)) {
  //         throw new HttpException(
  //           {
  //             statusCode: 15,
  //             message: `В поле currency может быть указано только одно из следующих значений: star, bonus, cash.`,
  //           },
  //           500,
  //         );
  //       }
  //       let card = {
  //         id: id,
  //         insDate: date,
  //         section,
  //         sort,
  //         name,
  //         jpg_url,
  //         status,
  //         category: this.convertStringToArray(category),
  //         subcategory,
  //         platform: this.convertStringToArray(platform),
  //         benefit: this.convertStringToArray(benefit),
  //         partner,
  //         partner_url,
  //         purchase_interval,
  //         certificates: [],
  //       };
  //       const _id = mongoose.Types.ObjectId();
  //       let isSold = false;
  //       if (integration !== 'letual') {
  //         const idType = ean ? 'ean' : 'activation_code';
  //         const idValue = ean ? ean : activation_code;
  //         isSold = sold.some((el) => {
  //           if (!infinity) {
  //             return (
  //               el[idType] &&
  //               el[idType].toString() === idValue.toString() &&
  //               +el.terminal_code === +terminal_code
  //             );
  //           } else {
  //             return false;
  //           }
  //         });
  //       }
  //       let certificate = {
  //         _id,
  //         activation_code: activation_code ? activation_code.toString() : null,
  //         nominal: parseFloat(nominal),
  //         subscription,
  //         description,
  //         description_mail,
  //         how_to,
  //         how_to_mail,
  //         bonus_description,
  //         bonus,
  //         to_date: to_date ? new Date(`${to_date}T00:00:00Z`) : undefined,
  //         activation_date,
  //         duration: duration ? duration.toString() : null,
  //         product_code: product_code ? product_code.toString() : null,
  //         terminal_code: parseInt(terminal_code),
  //         graph_code,
  //         currency,
  //         limitation,
  //         pin_code: pin_code ? pin_code.toString() : null,
  //         isAvailable: !isSold,
  //         expires_in: expires_in
  //           ? new Date(`${expires_in}T00:00:00Z`)
  //           : undefined,
  //         integration,
  //         ean: ean ? ean.toString() : null,
  //         sidn: sidn ? sidn.toString() : null,
  //         infinity: infinity ? 1 : 0,
  //         prices,
  //       };
  //       if (integration && integration === 'buka') {
  //         const updatedCert = await this.integrationService.changeBukaInfo(
  //           card,
  //           certificate,
  //         );
  //         if (updatedCert) {
  //           const { bukaCard, bukaCert } = updatedCert;
  //           certificate = { ...bukaCert };
  //           card = { ...bukaCard };
  //         } else {
  //           continue;
  //         }
  //       }
  //       if (integration !== 'letual') {
  //         if (integration) {
  //           const eanDupe = certificates.find(
  //             (el) =>
  //               el.ean === certificate.ean &&
  //               el.terminal_code === certificate.terminal_code,
  //           );
  //           if (eanDupe) {
  //             Logger.log(
  //               `Дублируется идентификатор товара в системе партнера: ${eanDupe.ean}.`,
  //             );
  //             throw new HttpException(
  //               {
  //                 statusCode: 7,
  //                 message: `Дублируется идентификатор товара в системе партнера: ${eanDupe.ean}.`,
  //               },
  //               500,
  //             );
  //           }
  //         } else {
  //           const activationCodeDupe = certificates.find(
  //             (el) =>
  //               el.activation_code === certificate.activation_code &&
  //               el.terminal_code === certificate.terminal_code,
  //           );
  //           if (activationCodeDupe) {
  //             Logger.log(
  //               `Дублируется код активации: ${activationCodeDupe.activation_code}.`,
  //             );
  //             throw new HttpException(
  //               {
  //                 statusCode: 2,
  //                 message: `Дублируется код активации: ${activationCodeDupe.activation_code}.`,
  //               },
  //               500,
  //             );
  //           }
  //         }
  //       }
  //       if (integration === 'lamoda') {
  //         const DBCertificate = lamodaCertificatesDB.find(
  //           (item) => item.ean === certificate.ean,
  //         );
  //         if (DBCertificate) {
  //           certificate.activation_code = DBCertificate.activation_code;
  //           certificate.pin_code = DBCertificate.pin_code;
  //         } else {
  //           newLamodaCertificates.push(certificate);
  //         }
  //       }
  //       certificates.push(certificate);
  //       const found = cards.find((el) => {
  //         return (
  //           el.sort === sort &&
  //           el.section === section &&
  //           el.name === name &&
  //           el.jpg_url === jpg_url &&
  //           el.status === status &&
  //           JSON.stringify(el.category) ===
  //             JSON.stringify(this.convertStringToArray(category)) &&
  //           el.subcategory === subcategory &&
  //           JSON.stringify(el.platform) ===
  //             JSON.stringify(this.convertStringToArray(platform)) &&
  //           JSON.stringify(el.benefit) ===
  //             JSON.stringify(this.convertStringToArray(benefit)) &&
  //           el.partner === partner &&
  //           el.partner_url === partner_url &&
  //           el.purchase_interval === purchase_interval
  //         );
  //       });
  //       if (found) {
  //         cards[cards.indexOf(found)].certificates.push(certificate['_id']);
  //       } else {
  //         card.certificates.push(certificate['_id']);
  //         cards.push(card);
  //         id++;
  //       }
  //     }
  //     // Get Lamoda Certificates nominal
  //     function countingNominals(certificates) {
  //       const hash = {};
  //       certificates.forEach((item) => {
  //         if (!hash[item.nominal]) {
  //           hash[item.nominal] = 1;
  //         } else {
  //           hash[item.nominal] += 1;
  //         }
  //       });
  //       return hash;
  //     }
  //     // Формирование запроса для отправки
  //     if (newLamodaCertificates.length) {
  //       const newLamodaCertificatesCount = countingNominals(
  //         newLamodaCertificates,
  //       );
  //       const lamodaGenerateRequest = [];
  //       for (const item in newLamodaCertificatesCount) {
  //         lamodaGenerateRequest.push({
  //           amount: item,
  //           number: newLamodaCertificatesCount[item],
  //         });
  //       }
  //       // Запрос на генерацию новых кодов
  //       const generatedCodes = await this.integrationService.generateCertificates(
  //         lamodaGenerateRequest,
  //       );
  //       // Заполнение кода активации и кода сертификата в массив сертификатов Ламоды
  //       newLamodaCertificates.map((certificate) => {
  //         const codeIndex = generatedCodes.findIndex(
  //           (item) => Math.floor(item.amount) === certificate.nominal,
  //         );
  //         if (codeIndex > -1) {
  //           certificate.activation_code =
  //             generatedCodes[codeIndex].certificate_code;
  //           certificate.pin_code = generatedCodes[codeIndex].activation_code;
  //           generatedCodes.splice(codeIndex, 1);
  //         } else {
  //           Logger.log(
  //             `Не получен код активации для сертификата с номиналом: ${certificate.nominal} EAN: ${certificate.ean}`,
  //           );
  //           throw new HttpException(
  //             {
  //               statusCode: 17,
  //               message: `Не получен код активации для сертификата с номиналом: ${certificate.nominal} EAN: ${certificate.ean}`,
  //             },
  //             500,
  //           );
  //         }
  //       });
  //     }
  //     return { cards, certificates };
  //   }
  //   private async parseFilePromocodes(file: any): Promise<any> {
  //     let data = this.getJsonPromocodes(file);
  //     data = data.map((el) => {
  //       if (!el.product_codes) el.product_codes = [];
  //       else el.product_codes = el.product_codes.split(';');
  //       return el;
  //     });
  //     return data;
  //   }
  //   private async setBucketPolicy(bucket) {
  //     const policy = {
  //       Version: '2012-10-17',
  //       Statement: [
  //         {
  //           Action: 's3:GetObject',
  //           Effect: 'Allow',
  //           Principal: { AWS: '*' },
  //           Resource: [`arn:aws:s3:::${bucket}/*`],
  //           Sid: 'Public',
  //         },
  //       ],
  //     };
  //     return minioClient.setBucketPolicy(bucket, JSON.stringify(policy));
  //   }
  //   private async uploadImages(images: any, cards: any): Promise<any> {
  //     const bucket = `${process.env.MINIO_BUCKET}`;
  //     const exist = await minioClient.bucketExists(bucket);
  //     let excelImageNames = [];
  //     cards.map((card) => {
  //       if (card.jpg_url && !card.jpg_url.includes('buka')) {
  //         excelImageNames.push(card.jpg_url);
  //       }
  //     });
  //     excelImageNames = [...new Set(excelImageNames)];
  //     images = images.filter((image) =>
  //       excelImageNames.includes(image.originalname),
  //     );
  //     const fileImageNames = images.map((image) => {
  //       return image.originalname;
  //     });
  //     for (let i = 0; i < excelImageNames.length; i++) {
  //       const imageName = excelImageNames[i];
  //       // проверяем, чтобы названия изображений были на английском языке без пробелов
  //       if (!/^[+\--.0-9A-Z_a-z]+$/.test(imageName)) {
  //         Logger.log(
  //           `Имя файла должно состоять из латинских букв без пробелов. Допустимо использование цифр и спецсимволов: “_”, “-”, “+”. Некорректное название: ${imageName}`,
  //         );
  //         throw new HttpException(
  //           {
  //             statusCode: 6,
  //             message: `Имя файла должно состоять из латинских букв без пробелов. Допустимо использование цифр и спецсимволов: “_”, “-”, “+”. Некорректное название: ${imageName}`,
  //           },
  //           500,
  //         );
  //         // проверяем формат файла
  //       } else if (!['.png', '.jpg', '.jpeg'].includes(path.extname(imageName))) {
  //         Logger.log(
  //           `Изображение должно быть в формате png, jpg или jpeg: ${imageName}`,
  //         );
  //         throw new HttpException(
  //           {
  //             statusCode: 9,
  //             message: `Изображение должно быть в формате png, jpg или jpeg: ${imageName}`,
  //           },
  //           500,
  //         );
  //         // проверяем наличие изображений, указанных в excel
  //       } else if (!fileImageNames.includes(imageName)) {
  //         Logger.log(
  //           `Не найдено изображение: ${imageName}. Проверьте название и формат файла.`,
  //         );
  //         throw new HttpException(
  //           {
  //             statusCode: 8,
  //             message: `Не найдено изображение: ${imageName}. Проверьте название и формат файла.`,
  //           },
  //           500,
  //         );
  //       }
  //     }
  //     // проверяем размер изображений
  //     for (let i = 0; i < images.length; i++) {
  //       const image = images[i];
  //       // проверяем, чтобы размер изображений не превышал 1.5 мб
  //       if (image.size > 1.5 * 1024 * 1024) {
  //         Logger.log(
  //           `Размер изображения не должен превышать 1.5 мб: ${image.originalname}`,
  //         );
  //         throw new HttpException(
  //           {
  //             statusCode: 5,
  //             message: `Размер изображения не должен превышать 1.5 мб: ${image.originalname}`,
  //           },
  //           500,
  //         );
  //       }
  //     }
  //     if (!exist) {
  //       await minioClient.makeBucket(bucket, 'us-east-1');
  //       await this.setBucketPolicy(bucket);
  //     } else {
  //       // const objectsList = [];
  //       // const stream = minioClient.listObjects(bucket, '', true);
  //       // stream.on('data', function(obj) { objectsList.push(obj.name); });
  //       // // stream.on('error', function(err) { console.log(err) });
  //       // const streamEnd = new Promise(function(resolve, reject) {
  //       //     stream.on('end', () => resolve(stream.read()));
  //       //     stream.on('error', (e) => reject(e));
  //       // });
  //       // const streamResult = await streamEnd;
  //       // console.log('streamResult', streamResult)
  //       // const removeEnd = new Promise(function(resolve, reject) {
  //       //     minioClient.removeObjects(bucket, objectsList, function(e) {
  //       //         if (e) reject(`Unable to remove Objects: ${e}`);
  //       //         resolve('Removed the objects successfully');
  //       //     })
  //       // });
  //       // const removeResult = await removeEnd;
  //       // console.log('removeResult', removeResult);
  //     }
  //     for (const image of images) {
  //       const putEnd = new Promise(function (resolve, reject) {
  //         minioClient.putObject(
  //           bucket,
  //           image.originalname,
  //           image.buffer,
  //           image.size,
  //           { 'Content-type': 'image' },
  //           function (err, obj) {
  //             if (err)
  //               reject(
  //                 `Unable to put object: ${err}; object name: ${image.originalname}`,
  //               );
  //             resolve(
  //               `Put the object successfully: ${obj}; object name: ${image.originalname}`,
  //             );
  //           },
  //         );
  //       });
  //       const putResult = await putEnd;
  //       // console.log('putResult', putResult);
  //       const found = cards.filter((el) => el['jpg_url'] === image.originalname);
  //       if (found && found.length) {
  //         found.forEach((el) => {
  //           cards[cards.indexOf(el)][
  //             'jpg_url'
  //           ] = `https://stor02.srv.bms.group/${bucket}/${image.originalname}`;
  //         });
  //       }
  //     }
  //     return cards;
  //   }
  //   private async removeUploadedBarcodes(bucket): Promise<any> {
  //     const objectsList = [];
  //     const stream = minioClient.listObjects(bucket, '', true);
  //     stream.on('data', function (obj) {
  //       objectsList.push(obj.name);
  //     });
  //     // stream.on('error', function(err) { console.log(err) });
  //     const streamEnd = new Promise(function (resolve, reject) {
  //       stream.on('end', () => resolve(stream.read()));
  //       stream.on('error', (e) => reject(e));
  //     });
  //     await streamEnd;
  //     const removeEnd = new Promise(function (resolve, reject) {
  //       minioClient.removeObjects(bucket, objectsList, function (e) {
  //         if (e) reject(`Unable to remove Objects: ${e}`);
  //         resolve('Removed the objects successfully');
  //       });
  //     });
  //     await removeEnd;
  //     return objectsList;
  //   }
  //   private async getUploadedBarcodes(bucket): Promise<any> {
  //     const objectsList = [];
  //     const stream = minioClient.listObjects(bucket, '', true);
  //     stream.on('data', function (obj) {
  //       objectsList.push(obj.name);
  //     });
  //     // stream.on('error', function(err) { console.log(err) });
  //     const streamEnd = new Promise(function (resolve, reject) {
  //       stream.on('end', () => resolve(stream.read()));
  //       stream.on('error', (e) => reject(e));
  //     });
  //     await streamEnd;
  //     return objectsList;
  //   }
  //   async uploadBarcodes(certificates: any, checkUploaded = true): Promise<any> {
  //     const bucket = `${process.env.MINIO_BUCKET}-barcodes`;
  //     const exist = await minioClient.bucketExists(bucket);
  //     let filteredCertificates = [];
  //     if (!exist) {
  //       await minioClient.makeBucket(bucket, 'us-east-1');
  //       await this.setBucketPolicy(bucket);
  //       filteredCertificates = certificates.filter(
  //         (certificate) => certificate.graph_code,
  //       );
  //     } else {
  //       try {
  //         if (!checkUploaded) {
  //           filteredCertificates = certificates;
  //         } else {
  //           // await this.removeUploadedBarcodes(bucket) // для теста загрузки
  //           const uploadedBarcodes = await this.getUploadedBarcodes(bucket);
  //           filteredCertificates = certificates.filter(function (certificate) {
  //             return (
  //               certificate.graph_code &&
  //               this.indexOf(
  //                 `${certificate.terminal_code}${certificate.activation_code}.png`,
  //               ) < 0
  //             );
  //           }, uploadedBarcodes);
  //         }
  //       } catch (e) {
  //         Logger.error(
  //           `UPLOAD BARCODES -- ERROR: ${
  //             e.response ? JSON.stringify(e.response) : e
  //           }`,
  //         );
  //       }
  //     }
  //     if (filteredCertificates.length) {
  //       const promises = [];
  //       for (const certificate of filteredCertificates) {
  //         // console.log('certificate', certificate)
  //         const { activation_code, graph_code, terminal_code } = certificate;
  //         let format = '';
  //         let code = activation_code;
  //         let additionally = null;
  //         switch (graph_code) {
  //           case 'CODE128':
  //             format = 'CODE128';
  //             break;
  //           case 'EAN13':
  //             format = 'ean13';
  //             code = parseInt(activation_code);
  //             break;
  //           case 'EAN128':
  //             format = 'CODE128';
  //             additionally = {
  //               ean128: true,
  //             };
  //             break;
  //           default:
  //             Logger.log(`Не поддерживается тип штрихкода: ${graph_code}.`);
  //             throw new HttpException(
  //               {
  //                 statusCode: 3,
  //                 message: `Не поддерживается тип штрихкода: ${graph_code}.`,
  //               },
  //               500,
  //             );
  //         }
  //         const xmlSerializer = new XMLSerializer();
  //         const document = new DOMImplementation().createDocument(
  //           'http://www.w3.org/1999/xhtml',
  //           'html',
  //           null,
  //         );
  //         const svgNode = document.createElementNS(
  //           'http://www.w3.org/2000/svg',
  //           'svg',
  //         );
  //         try {
  //           await JsBarcode(svgNode, code, {
  //             xmlDocument: document,
  //             format,
  //             ...additionally,
  //           });
  //         } catch (e) {
  //           Logger.error(
  //             `GENERATE BARCODES -- ERROR: ${
  //               e.response ? JSON.stringify(e.response) : e
  //             }`,
  //           );
  //           throw new HttpException(e, 500);
  //         }
  //         const svgText = xmlSerializer.serializeToString(svgNode);
  //         let image = svgText;
  //         try {
  //           image = await svgToImg.from(svgText).toPng();
  //         } catch (e) {
  //           Logger.error(
  //             `SVG TO IMG -- ERROR: ${
  //               e.response ? JSON.stringify(e.response) : e
  //             }`,
  //           );
  //           throw new HttpException(e, 500);
  //         }
  //         const putImage = (terminal_code, activation_code, image) => {
  //           return new Promise(function (resolve, reject) {
  //             minioClient.putObject(
  //               bucket,
  //               `${terminal_code}${activation_code}.png`,
  //               image,
  //               null,
  //               { 'Content-type': 'image' },
  //               function (err, obj) {
  //                 if (err)
  //                   reject(
  //                     `Unable to put object: ${err}; object name: ${activation_code}`,
  //                   );
  //                 resolve(
  //                   `Put the object successfully: ${obj}; object name: ${activation_code}`,
  //                 );
  //               },
  //             );
  //           });
  //         };
  //         promises.push(putImage(terminal_code, activation_code, image));
  //       }
  //     }
  //     const certificatesWithGraphCode = certificates.filter(
  //       (certificate) => certificate.graph_code,
  //     );
  //     certificatesWithGraphCode.forEach((certificate) => {
  //       certificate.graph_code = `https://stor02.srv.bms.group/${bucket}/${certificate.terminal_code}${certificate.activation_code}.png`;
  //     });
  //     return certificates;
  //   }
  //   private async getRetailPoints(certificates: any): Promise<any> {
  //     const terminalCodes = [];
  //     certificates.forEach((el) => {
  //       if (!terminalCodes.includes(el.terminal_code)) {
  //         terminalCodes.push(el.terminal_code);
  //       }
  //     });
  //     const url = `${process.env.POINTS_URL}/api/retailPoints/search?page=0&size=100000&sort=id,ASC`;
  //     const data = {
  //       data: {
  //         terminalCodes,
  //       },
  //     };
  //     const token = this.generateToken(process.env.POINTS_TOKEN);
  //     const headers = {
  //       Authorization: 'Basic ' + token,
  //     };
  //     const res = await this.remoteService.baseRequest(
  //       'post',
  //       url,
  //       data,
  //       null,
  //       headers,
  //     );
  //     const points = [];
  //     terminalCodes.forEach((terminalCode) => {
  //       const point = res.content.find((point) =>
  //         point.terminals.find(
  //           (terminal) => parseInt(terminal.code) === parseInt(terminalCode),
  //         ),
  //       );
  //       if (point) {
  //         const el = {
  //           terminal_code: terminalCode,
  //           retail_point_id: point.id,
  //         };
  //         points.push(el);
  //       } else {
  //         Logger.log(`Не найдена точка для терминала: ${terminalCode}.`);
  //         throw new HttpException(
  //           {
  //             statusCode: 4,
  //             message: `Не найдена точка для терминала: ${terminalCode}.`,
  //           },
  //           500,
  //         );
  //       }
  //     });
  //     return points;
  //   }
  //   async upload(files: any): Promise<any> {
  //     const json = this.getJson(files.file[0]);
  //     const data = await this.parseFile(json);
  //     data.cards = await this.uploadImages(files.images, data.cards);
  //     data.certificates = await this.uploadBarcodes(data.certificates);
  //     console.log('certificates');
  //     data.points = await this.getRetailPoints(data.certificates);
  //     console.log('points');
  //     // console.log('data', data);
  //     try {
  //       await this.cardModel.collection.drop();
  //     } catch (e) {
  //       Logger.error(
  //         `CARD COLLECTION DROP -- ERROR: ${
  //           e.response ? JSON.stringify(e.response) : e
  //         }`,
  //       );
  //     }
  //     await this.cardModel.collection.insertMany(data.cards);
  //     await this.cardModel.collection.createIndex({ section: 1 });
  //     await this.cardModel.collection.createIndex({ category: 1 });
  //     await this.cardModel.collection.createIndex({ platform: 1 });
  //     await this.cardModel.collection.createIndex({ benefit: 1 });
  //     await this.cardModel.collection.createIndex({ partner: 1 });
  //     await this.cardModel.collection.createIndex({ sort: 1 });
  //     await this.cardModel.collection.createIndex({ name: 1 });
  //     try {
  //       await this.certificateModel.collection.drop();
  //     } catch (e) {
  //       Logger.error(
  //         `CERTIFICATE COLLECTION DROP -- ERROR: ${
  //           e.response ? JSON.stringify(e.response) : e
  //         }`,
  //       );
  //     }
  //     await this.certificateModel.collection.insertMany(data.certificates);
  //     await this.certificateModel.collection.createIndex({ currency: 1 });
  //     await this.certificateModel.collection.createIndex({ nominal: 1 });
  //     try {
  //       await this.pointModel.collection.drop();
  //     } catch (e) {
  //       Logger.error(
  //         `POINT COLLECTION DROP -- ERROR: ${
  //           e.response ? JSON.stringify(e.response) : e
  //         }`,
  //       );
  //     }
  //     await this.pointModel.collection.insertMany(data.points);
  //     return true;
  //     // await minioClient.listBuckets(function(err, buckets) {
  //     //     if (err) return console.log(err)
  //     //     console.log('buckets :', buckets)
  //     // })
  //   }
  //   async uploadPromocodes(file: any): Promise<any> {
  //     console.log('files.service:', file.file[0]);
  //     const data = await this.parseFilePromocodes(file.file[0]);
  //     // console.log('data', data);
  //     try {
  //       await this.promocodeModel.collection.drop();
  //     } catch (e) {
  //       Logger.error(
  //         `PROMOCODE COLLECTION DROP -- ERROR: ${
  //           e.response ? JSON.stringify(e.response) : e
  //         }`,
  //       );
  //     }
  //     await this.promocodeModel.collection.insertMany(data);
  //     return true;
  //   }
}
