# udt-dataset-coco

The COCO dataset, converted to UDT format (CSV and JSON)

These files can be imported into the Universal Data Tool.

## API

You can query for images matching a caption using the API. The API will return
valid UDT datasets.

### Get all images matching labels

`GET /api/captions?labels=cat,dog`

### Get all images matching labels exclusively

e.g. images of either cat or dog, but no images containing both a cat and a dog.

`GET /api/captions?labels=cat,dog&exclusive`

### Get all images of different segmentations

`GET "/api/segmentations?labels=hot dog,bicycle"
