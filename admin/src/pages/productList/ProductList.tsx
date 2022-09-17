import './productList.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { deleteProducts, getProducts } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ProductType } from '../../types/Product';



const ProductList = () => {
  const dispatch = useDispatch()
  const products: ProductType[] = useSelector((state: RootState) => state.product.products)
  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const handleDelete = (id: string) => {
    deleteProducts(id, dispatch)
  }

  const columns: any[] = [
    { field: '_id', headerName: 'ID', width: 220 },
    {
      field: 'product', headerName: 'Product', width: 200, renderCell: (params: { row: { img: string; title: string | undefined }; }) => {
        return (
          <div className='productListField'>
            <img src={params.row.img} alt="" />
            {params.row.title}
          </div>
        )
      }
    },
    { field: 'inStock', headerName: 'Stock', width: 200 },
    {
      field: 'price',
      headerName: 'Price',
      width: 160
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Link to={`/product/${params.row._id}`}>
              <button className="editButton ">Edit</button>
            </Link>
            <DeleteOutline className='deleteButton' onClick={() => handleDelete(params.row._id)} />
          </>
        )
      }
    }
  ];

  return (
    <div className='productListPage'>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row: { _id: string }) => row._id}
        pageSize={13}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default ProductList