import { Alert } from "@heroui/alert";

import Header from "@/components/admin/header";

export default function AdminPage() {
  return (
    <main className="px-8 py-4">
      <Header
        description="Kelola semuanya di halaman dashboard."
        title="Dashboard"
      />
      <section>
        <Alert
          color="warning"
          description="Halaman ini belum tersedia dan masih dalam pengembangan."
          title="Dalam Pengembangan"
          variant="solid"
        />
      </section>
    </main>
  );
}
