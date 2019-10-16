import { DOM, toDOM, routeManage } from '../vanilly2';
import { IState } from '../state';

export const User = () => {
  const refs = {
    root: (undefined as any) as HTMLDivElement,
  };

  const user = DOM('div')
    .ref(r => (refs.root = r))
    .cssText('background:#f88')
    .textContent('user-page')
    .onUpdate(
      s => [s.age],
      ([age], self) => {
        if (age > 10) {
          toDOM(self).removeChild(ele => {
            if (ele.id === 'input') {
              toDOM(ele).remove();
            }
          });
        }
      },
    );

  const input = DOM('input')
    .setProps({ id: 'input' })
    .onRemove(() => {
      console.log('input-remove');
    });

  const p = DOM('p')
    .onUpdate<IState, [number]>(
      s => [s.age],
      ([age], self) => {
        console.log(age);
        self.textContent = age as any;
        console.log('xx');
      },
    )
    .onAppend(() => {
      console.log('onAppend-sub-p');
    })
    .textContent('111');

  const button = DOM('button')
    .ref(e => {
      e.onclick = () => {
        console.log('haha');
      };
    })
    .textContent('user-page-click');

  const changePage = DOM('button')
    .addEventListener('click', () => {
      routeManage.push('/home');
    })
    .textContent('go-home-page');

  return user.append(input, p, button, changePage);
};
