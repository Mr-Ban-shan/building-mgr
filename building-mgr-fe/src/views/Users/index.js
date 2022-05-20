import { defineComponent, ref, onMounted, reactive } from 'vue';
import { user } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import AddOne from './AddOne/index.vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { getCharacterInfoById } from '@/helpers/character';
import store from '@/store';
import { getHeaders } from '@/helpers/request';
import Update from './Update/index.vue';

const columns = [
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '创建日期',
    slots: {
      customRender: 'createdAt',
    },
  },
  {
    title: '角色',
    slots: {
      customRender: 'character',
    },
  },
  {
    title: '联系方式',
    slots: {
      customRender: 'phone',
    },
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions',
    },
  },
];

export default defineComponent({
  components: {
    AddOne,
    EditOutlined, 
    Update,
  },

  setup() {
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const showAddModal = ref(false);
    const showUpdateModal = ref(false);
    const keyword = ref('');
    const isSearch = ref(false);
    const showEditCharacterModal = ref(false);
    const curEditUser = ref({});

    const getUser = async () => {
      const res = await user.list(curPage.value, 10 , keyword.value );

      result(res)
        .success(({ data: { list: refList, total: resTotal } }) => {
          list.value = refList;
          total.value = resTotal;
        });
    };

    onMounted(() => {
      getUser();
    });

    const remove = async ({ _id }) => {
      const res = await user.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getUser();
        });
    };

    const setPage = (page) => {
      curPage.value = page;

      getUser();
    };

    const resetPassword = async ({ _id }) => {
      const res = await user.resetPassword(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
        });
    };

    const onSearch = () => {
      getUser();
      isSearch.value = !!keyword.value;
    };

    const backAll = () => {
      isSearch.value = false;
      keyword.value = '';
      getUser();
    };

    const editForm = reactive({
      character: '',
      current: {},
    });

    const onEdit = (record) => {
      editForm.current = record;
      editForm.character = record.character;

      showEditCharacterModal.value = true;
    };
    
    const updateCharacter = async () => {
      const res = await user.editCharacter(editForm.character, editForm.current._id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          showEditCharacterModal.value = false;
          editForm.current.character = editForm.character;
        });
    }; 

    const onUploadChange = ({ file }) => {
      if (file.response) {
        result(file.response)
          .success(async (key) => {
            const res = await user.addMany(key);

            result(res)
              .success(({ data: { addCount } }) => {
                message.success(`成功添加 ${addCount} 位用户`);

                getUser();
              });
          });
      }
    };

    /* // 显示更新弹框
    const update = (record ) => {
      showUpdateModal.value = true;
      curEditUser.value = record;
      console.log('@', curEditUser)
    }; */

    // 显示更新弹框
    const update = ( record ) => {
      showUpdateModal.value = true;
      curEditUser.value = record;
    };

    // 更新列表的某一行数据
    const updateCurUser = (newData) => {
      Object.assign(curEditUser.value, newData);
    };

    

    return {
      list,
      total,
      curPage,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
      showUpdateModal,
      getUser,
      setPage,
      resetPassword,
      isSearch,
      keyword,
      backAll,
      onSearch,
      showEditCharacterModal,
      editForm,
      getCharacterInfoById,
      characterInfo: store.state.characterInfo,
      onEdit,
      updateCharacter,
      onUploadChange,
      headers: getHeaders(),
      update,
      curEditUser,
      updateCurUser,
      /* 
      
      
      
      
      
      
      
      
      
      
      
      
      onUploadChange,
       */
    };

  },
});
/* 










  // {
  //   title: '库存',
  //   slots: {
  //     customRender: 'count',
  //   },
  // },
];


  
  setup() {
    
    
    
    
    
    
    

    

    

    

    

    

    

    
    

    

    
  },

 */