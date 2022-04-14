import { defineComponent, ref, onMounted } from 'vue';
import { buildingClassify } from '@/service';
import { result } from '@/helpers/utils';
import { message, Modal, Input } from 'ant-design-vue';

const columns = [
  {
    title: '分类',
    dataIndex: 'title',
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions',
    },
  },
];

export default defineComponent({
  setup() {
    const title = ref('');
    const list = ref([]);

    const getList = async () => {
      const res = await buildingClassify.list();

      result(res)
        .success(({ data }) => {
          list.value = data;
        });
    };

    const add = async () => {
      const res = await buildingClassify.add(title.value);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
          title.value = '';
        });
    };

    onMounted(() => {
      getList();
    });

    const remove = async ({ _id }) => {
      const res = await buildingClassify.remove(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);

          getList();
        });
    };

    const updateTitle = async ({ _id }) => {
      Modal.confirm({
        title: '请输入新的分类名称',
        content: (
          <div>
            <Input class="__building_classify_new_title" />
          </div>
        ),
        onOk: async () => {
          const title = document.querySelector('.__building_classify_new_title').value;

          const res = await buildingClassify.updateTitle(_id, title);

          result(res)
            .success(({ msg }) => {
              message.success(msg);

              list.value.forEach((item) => {
                if (item._id === _id) {
                  item.title = title;
                }
              });
            });
        },
      });
    };

    return {
      add,
      title,
      list,
      columns,
      remove,
      updateTitle,
    };
  },
});
