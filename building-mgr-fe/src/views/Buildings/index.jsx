import { defineComponent, ref, onMounted } from 'vue';
import AddOne from './AddOne/index.vue';
import { building , buildingClassify  } from '@/service';
import { result , formatTimestamp  } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import Update from './Update/index.vue';
/* import _ from '@/config/common'; */
import { getClassifyTitleById } from '@/helpers/building-classify';


export default defineComponent({
  components:{
    AddOne,
    Update,
  },
  props: {
    simple: Boolean,
  },
  setup(props){
  const router = useRouter();

    const columns = [
      {
       title: '名字',
        dataIndex: 'name',
      },
      {
        title: '作者',
        dataIndex: 'author',
      },
        {
         title: '价格',
         dataIndex: 'price',
       },
       {
        title: '库存',
        slots: {
          customRender: 'count',
        },
      },
       {
         title: '出版日期',
         dataIndex: 'publishDate',
         slots: {
          customRender: 'publishDate',
        },
       },
       {
         title: '分类',
         slots: {
          customRender: 'classify',
        },
       },
          /* {
        title: '操作',
        slots: { customRender: 'actions' }
      }   */
      ];

      if (!props.simple) {
        columns.push({
          title: '操作',
          dataIndex: 'actions',
          slots: {
            customRender: 'actions',
          },
        });
      } 

      const show = ref(false);
      const showUpdateModal = ref(false);
      const keyword = ref('');
      const list = ref([]);
      const total = ref(0);
      const curPage = ref(1);
      const isSearch = ref(false);
      const curEditBuilding=ref({});

      

      // 获取商品列表
    const getList = async () => {
      const res = await building.list({
        page: curPage.value,
        size: 10,
         keyword: keyword.value,  
      });

      result(res)
        .success(({ data }) => {
          const { list: l, total: t } = data;
          list.value = l;
          total.value = t;
        });
    };

    onMounted(async () => {
      getList();
    });

    // 设置页码
    // 切页
    const setPage = (page) => {
      curPage.value = page;

      getList();
    };

    // 触发搜索
    const onSearch = () => {
      getList();

      // 字符串非空的时候 -> true
      // 字符串为空的时候 -> false
      isSearch.value = Boolean(keyword.value);
    };

    // 回到全部列表
    const backAll = () => {
      keyword.value = '';
      isSearch.value = false;

      getList();
    };

    // 删除一本商品
    const remove = async ({ text: record }) => {
      const { _id } = record;

      const res = await building.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getList();
        });
    };

    const updateCount = (type,record) =>{
        let word = '增加';
  
        if (type === 'OUT_COUNT') {
          word = '减少';
        }
  
         Modal.confirm({
          title: `要${word}多少库存`,
          content: (
            <div>
              <Input class="__building_input_count" />
            </div>
          ),
          onOk: async () => {
            const el = document.querySelector('.__building_input_count');
            let num = el.value;
  
            const res = await building.updateCount({
              id: record._id,
              num,
              type,
            });
  
            result(res)
              .success((data) => {
                if (type === 'IN_COUNT') {
                  // 入库操作
                  num = Math.abs(num);
                } else {
                  // 出库操作
                  num = -Math.abs(num);
                }
  
                const one = list.value.find((item) => {
                  return item._id === record._id;
                });
  
                if (one) {
                  console.log(num);
                  one.count = one.count + num;
  
                  message.success(`成功${word} ${Math.abs(num)} 本书`);
                }
               });
           },
         });
     };

     // 显示更新弹框
    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditBuilding.value = record;
    };

    // 更新列表的某一行数据
    const updateCurBuilding = (newData) => {
      Object.assign(curEditBuilding.value, newData);
    };

     

    // 进入商品详情页
    const toDetail = ({ record }) => {
      router.push(`/buildings/${record._id}`);
    };

      return { 
        columns,
        show,
        list,
        formatTimestamp,
        curPage,
        total,
        setPage,
        keyword,
        onSearch,
        backAll,
        isSearch,
        remove,
        updateCount,
        showUpdateModal,
        update,
        curEditBuilding,
        updateCurBuilding,
        getList,
        toDetail,
        getClassifyTitleById,
        simple: props.simple,
      };
  },
});
