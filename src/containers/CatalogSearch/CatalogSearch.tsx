import React, { useEffect, useState } from 'react';
import './CatalogSearch.scss';
import { useLocation, useHistory } from 'react-router';
import { Row, Col, Form } from 'react-bootstrap';
import { ListProduct, DefaultSidebar, FilterSidebar } from '../../components';
import { Pagination, Loader } from '../../components/common';
import { getQueryStringValue, objToQueryUrl } from '../../helpers';
import {
  useAppDispatch,
  useAppSelector,
  doGetSearchListProduct,
  doGetCountSearchListProduct,
} from '../../redux';
import { Elimit } from '../../constants';

export const CatalogSearch = () => {
  let { search, pathname } = useLocation();
  const history = useHistory();

  const [textSearch, setTextSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [orderBy, setOrderBy] = useState('ASC');
  const [typeProduct, setTypeProduct] = useState('');
  const [price, setPrice] = useState('');
  const [votes, setVotes] = useState('');

  const dispatch = useAppDispatch();
  const { listSearchProduct, isLoading, pathSrc, numbersProduct } = useAppSelector(
    (state) => state.productSlice,
  );

  const query = new URLSearchParams(search);
  const listQuery: any = {};

  query.forEach((value, name) => {
    listQuery[name] = value;
  });

  useEffect(() => {
    handleGetCountProduct();
    if (search) {
      setTextSearch(getQueryStringValue('text'));
      setPrice(getQueryStringValue('price'));
      setVotes(getQueryStringValue('votes'));
      setTypeProduct(getQueryStringValue('typeproduct'));
    }
  }, [search]);

  useEffect(() => {
    handleDispatch();
    handleGetCountProduct();
  }, [price, votes, typeProduct, textSearch, pageNumber, orderBy]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    history.push({
      pathname,
      search: objToQueryUrl(listQuery, { name: 'page', value: pageNumber }),
    });

    // handleDispatch();
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(1);
    history.push({
      pathname,
      search: objToQueryUrl(listQuery, { name: 'orderby', value: orderBy }),
    });

    // handleDispatch();
  }, [orderBy]);

  useEffect(() => {
    setPageNumber(1);
  }, [textSearch]);

  const handleDispatch = () => {
    dispatch(
      doGetSearchListProduct({
        search: textSearch,
        limit: Elimit.productSearchLimit,
        page: pageNumber - 1,
        orderby: orderBy,
        price: price,
        typeproduct: typeProduct,
        votes: votes,
      }),
    );
  };

  const handleGetCountProduct = () => {
    dispatch(
      doGetCountSearchListProduct({
        search: textSearch,
        price: price,
        typeproduct: typeProduct,
        votes: votes,
      }),
    );
  };

  return (
    <div className="catalog-search">
      <Row className="catalog-search__container">
        <Col md={3} className="catalog-search__left">
          {/* {listSearchProduct && listSearchProduct.length ? (
            <FilterSidebar listQuery={listQuery} />
          ) : (
            <></>
          )} */}
          <FilterSidebar listQuery={listQuery} />
          <DefaultSidebar />
        </Col>
        <Col md={9}>
          <div className="catalog-search__right">
            <p className="catalog-search__title">
              K???T QU??? T??M KI???M V???I: {textSearch.toUpperCase()}
            </p>
            {!listSearchProduct || !listSearchProduct.length ? (
              <div className="catalog-search__empty">
                <span>Kh??ng c?? s???n ph???m ph?? h???p v???i t??? kh??a t??m ki???m c???a b???n.</span>
              </div>
            ) : (
              <>
                {isLoading && <Loader />}
                <div className="catalog-search__header">
                  <div className="catalog-search__list-tag">
                    {/* {[1, 2, 3, 4, 5, 1, 1, 1, 1, 1].map((item) => {
                      return (
                        <div className="catalog-search__list-tag__item">
                          <span>S??ch Gi??o Khoa C???p 1</span>
                        </div>
                      );
                    })} */}
                  </div>

                  <div className="catalog-search__sort">
                    <span>S???p x???p theo :</span>
                    <Form.Select
                      className="catalog-search__select"
                      name="orderby"
                      onChange={(e: any) => {
                        setOrderBy(e.target.value);
                      }}
                      defaultValue={orderBy}
                    >
                      <option value="ASC">Gi?? t??ng d???n</option>
                      <option value="DESC">Gi?? gi???m d???n</option>
                    </Form.Select>
                  </div>
                </div>

                <div className="catalog-search__list">
                  <ListProduct numCol={4} listproducts={listSearchProduct} path={pathSrc} />
                </div>

                <Pagination
                  numberPages={Math.ceil(numbersProduct / Elimit.productSearchLimit)}
                  currentPage={pageNumber}
                  handleSelectedNumber={(number: number) => {
                    setPageNumber(number);
                  }}
                />
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
