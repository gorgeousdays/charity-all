import { Button, Card, Col, Form, Input, Row } from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table, { TableProps } from 'antd/es/table';
import { connect } from 'dva';
import { ColumnProps } from 'antd/lib/table';
import { StateType } from './model';
import { TableListItem, TableListParams } from './data';

import styles from './style.less';

const FormItem = Form.Item;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  listTableList: StateType;
}

interface TableListState {
  formValues: { [key: string]: string };
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    newsList,
    loading,
  }: {
    newsList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    listTableList: newsList,
    loading: loading.models.transsactionList,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    formValues: {},
  };

  columns: ColumnProps<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '封面图片',
      dataIndex: 'img',
    },
    {
      title: '简介',
      dataIndex: 'introduce',
    },
    {
      title: '内容',
      dataIndex: 'id',
      render: id => <Button>详情</Button>,
    },
    {
      title: '发布时间',
      dataIndex: 'createdTime',
    },
    {
      title: '作者',
      dataIndex: 'author',
      render: a => (
        <span>
          id:{a.id}, 昵称:{a.nickname}
        </span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      align: 'right',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Button onClick={() => this.handleRemove(record.id)} type="danger">
            删除
          </Button>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'newsList/fetch',
    });
  }

  handleRemove = (id: number) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'newsList/remove',
      payload: id,
    });
  };

  handleStandardTableChange: TableProps<TableListItem>['onChange'] = (
    pagination,
    filtersArg,
    sorter,
    ...rest
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      size: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.field = sorter.field;
      params.direction = sorter.order;
    }

    dispatch({
      type: 'newsList/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'newsList/fetch',
      payload: {},
    });
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('handle search');

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        formValues: fieldsValue,
      });
      dispatch({
        type: 'newsList/fetch',
        payload: fieldsValue,
      });
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="ID">
              {getFieldDecorator('newsId')(<Input placeholder="新闻ID" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const {
      listTableList: { data },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}></div>
            <Table
              loading={loading}
              dataSource={data.list}
              pagination={data.pagination}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
