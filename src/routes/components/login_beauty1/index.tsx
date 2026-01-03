import { createFileRoute } from '@tanstack/solid-router';
import { LoginBeautyContent1 } from './-content';

/**
 * rose-bonbon: #FF94B0
 */

export const Route = createFileRoute('/components/login_beauty1/')({
  component: () => (
    <div class='grid w-full content-center place-items-center h-full pt-12 grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-20'>
      <LoginBeautyContent1 color='#FF94B0' />
      <LoginBeautyContent1 />
      <LoginBeautyContent1 color='lightgray' />
      <LoginBeautyContent1 color='#A47BFC' />
      <LoginBeautyContent1 color='lime' />
      <LoginBeautyContent1 color='black' validColor='green' />
    </div>
  ),
});
