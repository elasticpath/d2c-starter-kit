import { ProductResponse } from "@moltin/sdk";
import {
  getSkuFromOptions,
  isChildProductResource,
  isSimpleProductResource,
  _flattenVariationsOptions,
  _performMapping,
  _restructureVariationsMatrix,
} from "../services/helper";

describe("helpers", () => {
  it("getSkuFromOptions should return the sku id for the sku with options matching those provided", () => {
    const sampleOptions: { [key: string]: string } = {
      "ea44088a-cfda-41b6-b859-5471a8ca693e":
        "7eef4c04-bf40-4166-a08e-845fbd2980f9",
      "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89":
        "217883ce-55f1-4c34-8e00-e86c743f4dff",
      "b250875e-7468-4364-8257-fb8cfcc486c2":
        "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
    };
    /* Order of options should not matter.
        top level key is a sku id e.g. 709e6cc6-a40c-4833-9469-b4abd0e7f67f, second level keys are
        all varitions ids e.g. ea44088a-cfda-41b6-b859-5471a8ca693e and the string value of each 
        options second level key is an options id e.g. 4252d475-2d0e-4cd2-99d3-19fba34ef211
      */
    const sampleSkuLookup = {
      "709e6cc6-a40c-4833-9469-b4abd0e7f67f": {
        "ea44088a-cfda-41b6-b859-5471a8ca693e":
          "4252d475-2d0e-4cd2-99d3-19fba34ef211",
        "b250875e-7468-4364-8257-fb8cfcc486c2":
          "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89":
          "217883ce-55f1-4c34-8e00-e86c743f4dff",
      },
      "c05839f5-3eac-48f2-9d36-1bc2a481a213": {
        "ea44088a-cfda-41b6-b859-5471a8ca693e":
          "4252d475-2d0e-4cd2-99d3-19fba34ef211",
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89":
          "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "b250875e-7468-4364-8257-fb8cfcc486c2":
          "8b6dfc96-11e6-455d-b042-e4137df3f13a",
      },
      "23ff5935-25bc-4729-a770-8ff551e46188": {
        "ea44088a-cfda-41b6-b859-5471a8ca693e":
          "7eef4c04-bf40-4166-a08e-845fbd2980f9",
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89":
          "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "b250875e-7468-4364-8257-fb8cfcc486c2":
          "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
      },
      "da54af20-440d-477d-b671-ef0d8fb77de6": {
        "ea44088a-cfda-41b6-b859-5471a8ca693e":
          "cca9ad56-99ff-4b23-8daa-4d87a05d9cdf",
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89":
          "e6e2939f-c152-415a-a151-2a216daa7c9b",
        "b250875e-7468-4364-8257-fb8cfcc486c2":
          "8b6dfc96-11e6-455d-b042-e4137df3f13a",
      },
    };

    expect(getSkuFromOptions(sampleSkuLookup, sampleOptions)).toEqual(
      "23ff5935-25bc-4729-a770-8ff551e46188"
    );
  });

  it("_restructureVariationsMatrix should return an object which has maps sku ids to the variations the options that make up the sku", () => {
    const variationMatrixSample = {
      "4252d475-2d0e-4cd2-99d3-19fba34ef211": {
        "217883ce-55f1-4c34-8e00-e86c743f4dff": {
          "45e2612f-6bbf-4bc9-8803-80c5cf78ed89":
            "709e6cc6-a40c-4833-9469-b4abd0e7f67f",
          "8b6dfc96-11e6-455d-b042-e4137df3f13a":
            "c05839f5-3eac-48f2-9d36-1bc2a481a213",
        },
        "37b5bcf7-0b65-4e12-ad31-3052e27c107f": {
          "45e2612f-6bbf-4bc9-8803-80c5cf78ed89":
            "9e07495c-caf1-4f11-93c5-16cfeb63d492",
          "8b6dfc96-11e6-455d-b042-e4137df3f13a":
            "b9bb984a-7a6d-4433-a445-1cde0383bece",
        },
      },
      "693b16b8-a3b3-4419-ad03-61007a381c56": {
        "217883ce-55f1-4c34-8e00-e86c743f4dff": {
          "45e2612f-6bbf-4bc9-8803-80c5cf78ed89":
            "2d864c10-146f-4905-859f-86e63c18abf4",
          "8b6dfc96-11e6-455d-b042-e4137df3f13a":
            "42aef769-c97e-48a8-a3c4-2af8ad504ebb",
        },
      },
    };

    const expectedOutput = {
      "2d864c10-146f-4905-859f-86e63c18abf4": [
        "693b16b8-a3b3-4419-ad03-61007a381c56",
        "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
      ],
      "42aef769-c97e-48a8-a3c4-2af8ad504ebb": [
        "693b16b8-a3b3-4419-ad03-61007a381c56",
        "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "8b6dfc96-11e6-455d-b042-e4137df3f13a",
      ],
      "709e6cc6-a40c-4833-9469-b4abd0e7f67f": [
        "4252d475-2d0e-4cd2-99d3-19fba34ef211",
        "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
      ],
      "9e07495c-caf1-4f11-93c5-16cfeb63d492": [
        "4252d475-2d0e-4cd2-99d3-19fba34ef211",
        "37b5bcf7-0b65-4e12-ad31-3052e27c107f",
        "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
      ],
      "b9bb984a-7a6d-4433-a445-1cde0383bece": [
        "4252d475-2d0e-4cd2-99d3-19fba34ef211",
        "37b5bcf7-0b65-4e12-ad31-3052e27c107f",
        "8b6dfc96-11e6-455d-b042-e4137df3f13a",
      ],
      "c05839f5-3eac-48f2-9d36-1bc2a481a213": [
        "4252d475-2d0e-4cd2-99d3-19fba34ef211",
        "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "8b6dfc96-11e6-455d-b042-e4137df3f13a",
      ],
    };

    expect(_restructureVariationsMatrix(variationMatrixSample)).toEqual(
      expectedOutput
    );
  });

  it("_flattenVariationsOptions should return an object that can map option ids to the corresponding variations.", () => {
    const variations = [
      {
        id: "b250875e-7468-4364-8257-fb8cfcc486c2",
        name: "Simple T-Shirt Sleeve Length",
        options: [
          {
            id: "8b6dfc96-11e6-455d-b042-e4137df3f13a",
            description: "Simple T-Shirt with short sleeves",
            name: "Short",
          },
          {
            id: "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
            description: "Simple T-Shirt with long sleeves",
            name: "Long",
          },
        ],
      },
      {
        id: "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89",
        name: "Generic Sizes",
        options: [
          {
            id: "e6e2939f-c152-415a-a151-2a216daa7c9b",
            description: "Small size",
            name: "SM",
          },
          {
            id: "37b5bcf7-0b65-4e12-ad31-3052e27c107f",
            description: "Medium size",
            name: "MD",
          },
          {
            id: "217883ce-55f1-4c34-8e00-e86c743f4dff",
            description: "Large size",
            name: "LG",
          },
        ],
      },
    ];

    const expectedOutput = {
      "217883ce-55f1-4c34-8e00-e86c743f4dff":
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89",
      "37b5bcf7-0b65-4e12-ad31-3052e27c107f":
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89",
      "45e2612f-6bbf-4bc9-8803-80c5cf78ed89":
        "b250875e-7468-4364-8257-fb8cfcc486c2",
      "8b6dfc96-11e6-455d-b042-e4137df3f13a":
        "b250875e-7468-4364-8257-fb8cfcc486c2",
      "e6e2939f-c152-415a-a151-2a216daa7c9b":
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89",
    };

    expect(_flattenVariationsOptions(variations)).toEqual(expectedOutput);
  });

  it("_performMapping should map each option to it's variation", () => {
    const variations = [
      {
        id: "b250875e-7468-4364-8257-fb8cfcc486c2",
        name: "Simple T-Shirt Sleeve Length",
        options: [
          {
            id: "8b6dfc96-11e6-455d-b042-e4137df3f13a",
            description: "Simple T-Shirt with short sleeves",
            name: "Short",
          },
          {
            id: "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
            description: "Simple T-Shirt with long sleeves",
            name: "Long",
          },
        ],
      },
      {
        id: "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89",
        name: "Generic Sizes",
        options: [
          {
            id: "e6e2939f-c152-415a-a151-2a216daa7c9b",
            description: "Small size",
            name: "SM",
          },
          {
            id: "37b5bcf7-0b65-4e12-ad31-3052e27c107f",
            description: "Medium size",
            name: "MD",
          },
          {
            id: "217883ce-55f1-4c34-8e00-e86c743f4dff",
            description: "Large size",
            name: "LG",
          },
        ],
      },
    ];

    const restructuredVariationMatrixSample = {
      "2d864c10-146f-4905-859f-86e63c18abf4": [
        "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
      ],
      "42aef769-c97e-48a8-a3c4-2af8ad504ebb": [
        "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "8b6dfc96-11e6-455d-b042-e4137df3f13a",
      ],
    };

    const flatVariationOptionsSample = {
      "217883ce-55f1-4c34-8e00-e86c743f4dff":
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89",
      "45e2612f-6bbf-4bc9-8803-80c5cf78ed89":
        "b250875e-7468-4364-8257-fb8cfcc486c2",
      "8b6dfc96-11e6-455d-b042-e4137df3f13a":
        "b250875e-7468-4364-8257-fb8cfcc486c2",
    };

    const expectedOutput = {
      "2d864c10-146f-4905-859f-86e63c18abf4": {
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89":
          "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "b250875e-7468-4364-8257-fb8cfcc486c2":
          "45e2612f-6bbf-4bc9-8803-80c5cf78ed89",
      },
      "42aef769-c97e-48a8-a3c4-2af8ad504ebb": {
        "9962a9f7-e47a-421d-a5c2-9fcc9ef2ab89":
          "217883ce-55f1-4c34-8e00-e86c743f4dff",
        "b250875e-7468-4364-8257-fb8cfcc486c2":
          "8b6dfc96-11e6-455d-b042-e4137df3f13a",
      },
    };

    expect(
      _performMapping(
        restructuredVariationMatrixSample,
        flatVariationOptionsSample
      )
    ).toEqual(expectedOutput);
  });

  it("isChildProductResource should return false if it's a base product", () => {
    const sampleProduct = {
      attributes: {
        base_product: true,
      },
    } as ProductResponse;
    expect(isChildProductResource(sampleProduct)).toEqual(false);
  });

  it("isChildProductResource should return false if it is a simple product", () => {
    const sampleProduct = {
      attributes: {
        base_product: false,
      },
    } as ProductResponse;
    expect(isChildProductResource(sampleProduct)).toEqual(false);
  });
  it("isChildProductResource should return true if it is a child product", () => {
    const sampleProduct = {
      attributes: {
        base_product: false,
        base_product_id: "123",
      },
    } as ProductResponse;
    expect(isChildProductResource(sampleProduct)).toEqual(true);
  });

  it("isSimpleProductResource should return true if it is a simple product", () => {
    const sampleProduct = {
      attributes: {
        base_product: false,
      },
    } as ProductResponse;
    expect(isSimpleProductResource(sampleProduct)).toEqual(true);
  });

  it("isSimpleProductResource should return false if it is a base product", () => {
    const sampleProduct = {
      attributes: {
        base_product: true,
      },
    } as ProductResponse;
    expect(isSimpleProductResource(sampleProduct)).toEqual(false);
  });

  it("isSimpleProductResource should return false if it is a child product", () => {
    const sampleProduct = {
      attributes: {
        base_product: true,
        base_product_id: "123",
      },
    } as ProductResponse;
    expect(isSimpleProductResource(sampleProduct)).toEqual(false);
  });
});
