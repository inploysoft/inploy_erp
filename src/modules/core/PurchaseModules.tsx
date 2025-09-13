import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PurchaseModules() {
  return (
    <>
      <Card
        // onClick={onClickPurchase}
        className="cursor-pointer transition duration-150 ease-in-out hover:shadow-md active:scale-95 active:shadow-sm"
      >
        <CardHeader>
          <CardTitle>ddd 구매</CardTitle>

          <CardDescription>Card Description</CardDescription>

          <CardAction>Card Action</CardAction>
        </CardHeader>

        <CardContent>
          <p>Card Content</p>
        </CardContent>

        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
