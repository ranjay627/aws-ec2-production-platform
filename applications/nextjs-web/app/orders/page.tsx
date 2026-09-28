import ResourceManager from "@/components/resource-manager";
import { resourceConfigs } from "@/lib/resources";

export default function OrdersPage() {
  return <ResourceManager config={resourceConfigs.orders} />;
}