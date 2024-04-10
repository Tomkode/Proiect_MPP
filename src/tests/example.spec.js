import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page.getByText("Welcome to my application!") ).toBeVisible();
});

test('view entities', async ({ page }) => {
  await page.goto('localhost:5173/');

  // Click the get started link.
  await page.getByRole('button', { name: 'View entities' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText("Nutritional Information") ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Entity' }) ).toBeVisible();
  await expect(page.getByRole('table') ).toBeVisible();
});

test("check add", async ({page}) => {
    await page.goto('localhost:5173/desserts')

    await expect(page.getByRole('button', { name: 'Add Entity' }) ).toBeVisible();
    await page.getByRole('button', { name: 'Add entity' }).click();

    await expect(page.getByText('Add a new entity')).toBeVisible();
    await page.getByPlaceholder("Name").fill("This is a test entity")
    await page.getByPlaceholder("Calories").fill("0")
    await page.getByPlaceholder("Fat").fill("10")
    await page.getByPlaceholder("Carbs").fill("20")
    await page.getByPlaceholder("Protein").fill("30")
    await expect(page.getByRole('button', { name: 'Submit' }) ).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('This is a test entity').first()).toBeVisible();
})

test("check close button", async ({page}) => {
    await page.goto('localhost:5173/desserts')

    await page.getByText("This is a test entity").first().click();

    await expect(page.getByText('Edit Entity')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close' }) ).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();


    await expect(page.getByText('Nutritional Information')).toBeVisible();
})




test("check edit go back", async ({page}) => {
    await page.goto('localhost:5173/desserts')

    await page.getByText("This is a test entity").first().click();

    await expect(page.getByText('Edit Entity')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Edit Entity' }) ).toBeVisible();
    await page.getByText('Edit Entity').click();


    await expect(page.getByRole('button', { name: 'Go back' }) ).toBeVisible();
    await page.getByRole('button', { name: 'Go back' }).click();
    await expect(page).toHaveURL('http://localhost:5173/desserts')
    
})

test("check delete button", async ({page}) => {
    await page.goto('localhost:5173/desserts')

    await page.getByText("This is a test entity").first().click();

    await expect(page.getByText('Edit Entity')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Delete entity' }) ).toBeVisible();
    await page.getByRole('button', { name: 'Delete entity' }).click();


    await expect(page.getByText('Nutritional Information')).toBeVisible();

    try{
        await expect(page.getByText('This is a test entity'))

        await expect(page.getByText('jdfncaoiwjhfgwoinugh'))
    }
    catch{
        return;
    }
})

// test("check edit", async ({page}) => {
//     await page.goto('localhost:5173/desserts')

//     await page.getByText("Frozen yoghurt").click();

//     await expect(page.getByText('Edit Entity')).toBeVisible();
//     await expect(page.getByRole('button', { name: 'Edit Entity' }) ).toBeVisible();
//     await page.getByText('Edit Entity').click();


//     await expect(page.getByText('Frozen yoghurt')).toBeVisible();
//     await page.getByText("Frozen yoghurt").fill("This is a test entity");

//     await expect(page.getByRole('button', { name: 'Save' }) ).toBeVisible();
//     await page.getByRole('button', { name: 'Save' }).click();
//     await expect(page).toHaveURL('http://localhost:5173/desserts')
//     await expect(page.getByText('This is a test entity')).toBeVisible();
//     try{
//         await expect(page.getByText('Frozen yoghurt'))

//         await expect(page.getByText('jdfncaoiwjhfgwoinugh'))
//     }
//     catch{
//         return;
//     }
// })
