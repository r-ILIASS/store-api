### API Endpoint:

`/api/v1/products`

### Query parameters:

| Querry Parameter   | options                                                                                                          | examples                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `?name=`           | `<string>`                                                                                                       | `/api/v1/products?company=Ikea`                      |
| `?company=`        | `<string>`                                                                                                       | `/api/v1/products?company=Ikea`                      |
| `?featured=`       | `<string>`                                                                                                       | `/api/v1/products?featured=true`                     |
| `?sort=`           | `<target>`<br><br>_accepts multiple targets separated by comma_<br>_prefix target with `-` for descending order_ | `/api/v1/products?sort=-name,price`                  |
| `?select=`         | `<target>` <br><br>_accepts multiple targets separated by comma_                                                 | `/api/v1/products?select=name,price`                 |
| `?limit=`          | `<number>`                                                                                                       | `/api/v1/products?limit=5`                           |
| `?page=`           | `<number>`                                                                                                       | `/api/v1/products?page=2`                            |
| `?numericFilters=` | `<target><operator><value>`<br><br>targets:`price`, `rating`<br>operators: `>` `<` `=` `<=` `>=`                 | `/api/v1/products?numericFilters=price>10,rating<=4` |

### Environment variables:

`MONGO_URI=<MongoDB's_native_driver_v2.2.12_or_later>`  
`PORT=<port>`
