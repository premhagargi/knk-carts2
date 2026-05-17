import { AdminPageHeader } from '@/components/admin/admin-ui';
import PostForm from '../post-form';

export default function NewPostPage() {
  return (
    <div>
      <AdminPageHeader title="New post" description="Write a new journal entry" />
      <PostForm />
    </div>
  );
}
