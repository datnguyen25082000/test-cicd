import React, { useEffect, useState, useRef } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import './AddNewProduct.scss';
import { InputFormProduct } from './InputFormProduct/InputFormProduct';
//import 'bootstrap-fileinput';
import { Editor } from '@tinymce/tinymce-react';
import { ClearButton, Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FormBook } from './FormBook/FormBook';
import { FormItem } from './FormItem/FormItem';
import { BsSearch } from 'react-icons/bs';
//import 'bootstrap-fileinput/css/fileinput.min.css';

export const AddNewProduct = () => {
  const [isCategoryLevelTwo, SetCategoryLeveTwo] = useState(false);
  const [isCategoryLevelThree, SetCategoryLeveThree] = useState(false);
  const [isBook, SetBook] = useState(false);
  const [isItem, SetItem] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('');
  const editorRef = useRef(null);
  const handleRadio = (e: any) => {
    if (e.currentTarget.value === 'book') {
      SetBook(true);
      SetItem(false);
    } else {
      SetBook(false);
      SetItem(true);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.book);
  };
  const handleInputChange = (input: any, e: any) => {
    console.log('value', input);
  };

  const handleChange = (selectedOptions: any) => {
    console.log(selectedOptions);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  const list = [
    {
      label: 'Alabama',
      population: 4780127,
      capital: 'Montgomery',
      region: 'South',
    },
    { label: 'Alaska', population: 710249, capital: 'Juneau', region: 'West' },
    { label: 'Arizona', population: 6392307, capital: 'Phoenix', region: 'West' },
    {
      label: 'Arkansas',
      population: 2915958,
      capital: 'Little Rock',
      region: 'South',
    },
    {
      label: 'California',
      population: 37254503,
      capital: 'Sacramento',
      region: 'West',
    },
    { label: 'Colorado', population: 5029324, capital: 'Denver', region: 'West' },
    {
      label: 'Connecticut',
      population: 3574118,
      capital: 'Hartford',
      region: 'Northeast',
    },
    { label: 'Delaware', population: 897936, capital: 'Dover', region: 'South' },
    {
      label: 'Florida',
      population: 18804623,
      capital: 'Tallahassee',
      region: 'South',
    },
    {
      label: 'Georgia',
      population: 9688681,
      capital: 'Atlanta',
      region: 'South',
    },
    { label: 'Hawaii', population: 1360301, capital: 'Honolulu', region: 'West' },
    { label: 'Idaho', population: 1567652, capital: 'Boise', region: 'West' },
    {
      label: 'Illinois',
      population: 12831549,
      capital: 'Springfield',
      region: 'Midwest',
    },
    {
      label: 'Indiana',
      population: 6484229,
      capital: 'Indianapolis',
      region: 'Midwest',
    },
    {
      label: 'Iowa',
      population: 3046869,
      capital: 'Des Moines',
      region: 'Midwest',
    },
    {
      label: 'Kansas',
      population: 2853132,
      capital: 'Topeka',
      region: 'Midwest',
    },
    {
      label: 'Kentucky',
      population: 4339349,
      capital: 'Frankfort',
      region: 'South',
    },
    {
      label: 'Louisiana',
      population: 4533479,
      capital: 'Baton Rouge',
      region: 'South',
    },
    {
      label: 'Maine',
      population: 1328361,
      capital: 'Augusta',
      region: 'Northeast',
    },
    {
      label: 'Maryland',
      population: 5773785,
      capital: 'Annapolis',
      region: 'South',
    },
    {
      label: 'Massachusetts',
      population: 6547817,
      capital: 'Boston',
      region: 'Northeast',
    },
    {
      label: 'Michigan',
      population: 9884129,
      capital: 'Lansing',
      region: 'Midwest',
    },
    {
      label: 'Minnesota',
      population: 5303925,
      capital: 'Saint Paul',
      region: 'Midwest',
    },
    {
      label: 'Mississippi',
      population: 2968103,
      capital: 'Jackson',
      region: 'South',
    },
    {
      label: 'Missouri',
      population: 5988927,
      capital: 'Jefferson City',
      region: 'Midwest',
    },
  ];
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="add-new-product">
          <div className="add-new-product__content">
            <div className="add-new-product__title">
              <h1>Th??ng tin c?? b???n</h1>
            </div>
            <InputFormProduct
              title="T??n s???n ph???m"
              type="text"
              placeholder="Nh???p t??n s???n ph???m (T???i ??a 100 k?? t???)"
              id="productname"
              maxLength={100}
            />
            <div className="add-new-product__item">???nh b??a (Ch???n ???nh ?????i di???n c???a s???n ph???m)</div>
            <div className="add-new-product__input">
              <div className="add-new-product__input__image">
                {selectedFile && <img src={preview} />}
              </div>
              <div className="add-new-product__input__upload">
                <label htmlFor="image" >
                  <input type="file" onChange={onSelectFile} id="image" accept=".jpg,.png" />
                  <span>
                    <Button variant="outline-secondary" style={{ fontSize: '12px' }}>
                      Upload ???nh b??a
                    </Button>
                  </span>
                </label>
              </div>
            </div>
            <div className="add-new-product__item">Danh m???c s???n ph???m</div>
            <div className="add-new-product__category">
              <Container>
                <Row>
                  <Col
                    lg={4}
                    md={4}
                    style={{
                      paddingRight: '20px',
                      borderRight: '1px solid #ccc ',
                      height: '370px',
                    }}
                  >
                    <div className="add-new-product__level">Danh m???c s???n ph???m c???p m???t</div>
                    <Typeahead
                      id="categorylevelone"
                      options={list}
                      placeholder="Ch???n danh m???c"
                      onInputChange={handleInputChange}
                      onChange={handleChange}
                    >
                      {({ onClear, selected }) => (
                        <div className="rbt-aux">
                          {!!selected.length && <ClearButton onClick={onClear} />}
                          {!selected.length && <BsSearch></BsSearch>}
                        </div>
                      )}
                    </Typeahead>
                  </Col>
                  <Col
                    lg={4}
                    md={4}
                    style={{
                      paddingRight: '20px',
                      borderRight: '1px solid #ccc ',
                      height: '370px',
                    }}
                  >
                    <div className={`add-new-product__level`}>Danh m???c s???n ph???m c???p hai</div>
                    <Typeahead
                      id="categoryleveltwo"
                      options={list}
                      placeholder="Ch???n danh m???c"
                      className={`${
                        isCategoryLevelTwo ? 'add-new-product__show' : 'add-new-product__hide'
                      }`}
                    >
                      {({ onClear, selected }) => (
                        <div className="rbt-aux">
                          {!!selected.length && <ClearButton onClick={onClear} />}
                          {!selected.length && <BsSearch></BsSearch>}
                        </div>
                      )}
                    </Typeahead>
                  </Col>
                  <Col lg={4} md={4} className="col-sm-6">
                    <div className="add-new-product__level">Danh m???c s???n ph???m c???p ba</div>
                    <Typeahead
                      id="categorylevelthree"
                      options={list}
                      placeholder="Ch???n danh m???c"
                      className={`${
                        isCategoryLevelThree ? 'add-new-product__show' : 'add-new-product__hide'
                      }`}
                    >
                      {({ onClear, selected }) => (
                        <div className="rbt-aux">
                          {!!selected.length && <ClearButton onClick={onClear} />}
                          {!selected.length && <BsSearch></BsSearch>}
                        </div>
                      )}
                    </Typeahead>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="add-new-product__item">M?? T??? s???n ph???m</div>
            <div className="add-new-product__textarea">
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  selector: 'textarea',
                  height: 400,
                  placeholder: 'Nh???p m?? t??? s???n ph???m c???a b???n',
                  plugins: 'paste image link autolink lists table media',
                  menubar: false,
                  toolbar: [
                    'undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright | forecolor backcolor | table link image media',
                  ],
                }}
              />
            </div>
            <div className="add-new-product__margin-10">
              <InputFormProduct
                title="Gi?? s???n ph???m"
                type="number"
                placeholder="Nh???p gi?? c???a s???n ph???m theo VN??"
                id="productprice"
                maxLength={14}
              />
            </div>
            <div className="add-new-product__margin-10">
              <InputFormProduct
                title="Kh???i l?????ng s???n ph???m"
                type="number"
                placeholder="Nh???p kh???i l?????ng c???a s???n ph???m theo gram SAU KHI ????NG G??I"
                id="productweight"
              />
            </div>
            <div className="add-new-product__margin-10">
              <InputFormProduct
                title="Kho h??ng"
                type="number"
                placeholder="Nh???p s??? l?????ng h??ng trong kho c???a b???n"
                id="productquantity"
              />
            </div>
            <div className="add-new-product__margin-10">
              <div className="add-new-product__item">
                K??ch th?????c ????ng g??i (Ph?? v???n chuy???n th???c t??? s??? thay ?????i n???u b???n nh???p sai k??ch th?????c)
              </div>
              <div className="add-new-product__package">
                <Container>
                  <Row>
                    <Col
                      lg={4}
                      md={4}
                      style={{
                        paddingRight: '20px',
                        borderRight: '1px solid #ccc ',
                        height: '50px',
                      }}
                    >
                      <div className="add-new-product__level">
                        <InputFormProduct
                          title="Chi???u r???ng"
                          type="number"
                          placeholder="cm"
                          id="productwidth"
                        />
                      </div>
                    </Col>
                    <Col
                      lg={4}
                      md={4}
                      style={{
                        paddingRight: '20px',
                        borderRight: '1px solid #ccc ',
                        height: '50px',
                      }}
                    >
                      <div className="add-new-product__level">
                        <InputFormProduct
                          title="Chi???u d??i"
                          type="number"
                          placeholder="cm"
                          id="productlength"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={4}>
                      <div className="add-new-product__level">
                        <InputFormProduct
                          title="Chi???u cao"
                          type="number"
                          placeholder="cm"
                          id="productheight"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>

            <div className="add-new-product__margin-10">
              <span className="add-new-product__title2">S???n ph???m thu???c lo???i</span>
              <span>
                <Form.Check
                  inline
                  label="S??ch"
                  name="group1"
                  type="radio"
                  id="book"
                  value="book"
                  onClick={handleRadio}
                />
                <Form.Check
                  inline
                  label="S???n ph???m kh??c"
                  name="group1"
                  type="radio"
                  id="item"
                  value="item"
                  onClick={handleRadio}
                />
              </span>
            </div>
          </div>
        </div>

        <div className={`${isBook ? 'add-new-product__show' : 'add-new-product__hide'}`}>
          <div className="add-new-product">
            <div className="add-new-product__content">
              <div className="add-new-product__title">
                <h1>Th??ng tin chi ti???t</h1>
              </div>
              <FormBook></FormBook>
              <div className="info__btn">
                <Button variant="secondary" style={{ marginRight: '10px' }}>
                  L??u & ???n
                </Button>
                <Button variant="danger">L??u & Hi???n th???</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${isItem ? 'add-new-product__show' : 'add-new-product__hide'}`}>
          <div className="add-new-product">
            <div className="add-new-product__content">
              <div className="add-new-product__title">
                <h1>Th??ng tin chi ti???t</h1>
              </div>
              <FormItem></FormItem>
              <div className="info__btn">
                <Button variant="secondary" style={{ marginRight: '10px' }}>
                  L??u & ???n
                </Button>
                <Button variant="danger">L??u & Hi???n th???</Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
