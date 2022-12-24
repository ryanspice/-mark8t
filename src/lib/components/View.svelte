<script>
  import { onMount } from "svelte";

  import Card, {
    PrimaryAction,
    Actions,
    ActionButtons,
    ActionIcons,
  } from "@smui/card";

  import Input from "@smui/textfield";
  import Checkbox from "@smui/checkbox";
  import FormField from "@smui/form-field";
  import Button, { Label } from "@smui/button";
  import Banner, { CloseReason } from "@smui/banner";
  import IconButton, { Icon } from "@smui/icon-button";
  import Paper, { Title, Subtitle } from "@smui/paper";
  import TopAppBar, { Row, Section } from "@smui/top-app-bar";
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";

  import Account from "./modules/Account.svelte";

  import styles from "./View.svelte.scss";
  import Drawer from "./Drawer.svelte";
  import ContactList from "./ContactList.svelte";
  import DialogForEditing from "./DialogForEditing.svelte";

  import Modules from "./modules/index.js";

  import { _NEW_PRODUCT_ } from "../schema.js";

  import { postJsonToTenant } from "../stores";

  let productContainer;
  let layoutContainer;

  let openBanner = false;
  let centered = false;
  let mobileStacked = true;

  const closedReasons = {
    [CloseReason.PRIMARY]: "Primary",
    [CloseReason.SECONDARY]: "Secondary",
    [CloseReason.UNSPECIFIED]: "Unspecified",
  };
  let closedReason = "None yet.";

  let openDialogForEditing = false;
  let data = {};
  let clicked = 0;

  let open = false;
  let active = "Inbox";

  let panelInfo = false;
  let panelProducts = false;
  let panel1Open = false;
  let panelContactInfo = false;
  let panel3Open = false;
  let panel4Open = false;
  let panelLayouts = false;
  let panelWebsite = false;

  // let account;
  // let email = '';
  // let name = '';
  // let tenant = '';
  // let tenantid = '';
  let layoutSelected;
  $: account = {};
  $: google = {};
  $: website = {};
  $: products = [];
  $: layouts = [
    {
      name: "Default Layout",
      description: "New Product Description",
      price: 0,
      image: "https://via.placeholder.com/150",
      link: "https://via.placeholder.com/150",
      id: 0,
    },
  ];

  import {
    fetchAdmin,
    getAccountDataFromLocalStorage,
    _API_STORE_ACCOUNT_,
    _API_STORE_WEBSITE_,
    _API_STORE_PRODUCTS_,
    _API_STORE_GOOGLE_,
  } from "../stores.js";
  _API_STORE_ACCOUNT_.subscribe((value) => {
    account = value || {};
  });
  _API_STORE_WEBSITE_.subscribe((value) => {
    website = value || {};
  });
  _API_STORE_PRODUCTS_.subscribe((value) => {
    products = value || [];
  });
  _API_STORE_GOOGLE_.subscribe((value) => {
    google = value || {};
  });

  //
  function handleBannerClosed(event) {
    closedReason = closedReasons[event.detail.reason];
  }

  //
  function setActive(value) {
    active = value;
    open = false;
  }

  //TODO: MOVE SOME VARIABLES TO STORE
  function getLatestDataFromLocalStorage() {
    //msal account
    //account = JSON.parse(localStorage.getItem('accounts'));

    //tenant data
    // website = JSON.parse(localStorage.getItem('--store-website'));
    // products = JSON.parse(localStorage.getItem('--store-products')) || [];
    // products?.sort((a, b) => a.id - b.id).reverse();
    // google = JSON.parse(localStorage.getItem('--store-google'));

    layoutSelected =
      JSON.parse(localStorage.getObject("--data-layoutSelected")) || layouts[0];
  }

  // //
  // function getAccountInfo() {
  //   name = account.name;
  //   email = account.username;
  //   tenantid = account.localAccountId;
  // }

  //
  function getPanelInfo() {
    panelInfo =
      localStorage.getObject("--panel--panelInfo") === "true" || false;
    panelProducts =
      localStorage.getObject("--panel--panelProducts") === "true" || false;
    panel1Open =
      localStorage.getObject("--panel--panel1Open") === "true" || false;
    panelContactInfo =
      localStorage.getObject("--panel--panelContactInfo") === "true" || false;
    panel3Open =
      localStorage.getObject("--panel--panel3Open") === "true" || false;
    panel4Open =
      localStorage.getObject("--panel--panel4Open") === "true" || false;
    panelLayouts =
      localStorage.getObject("--panel--panelLayouts") === "true" || false;
    panelWebsite =
      localStorage.getObject("--panel--panelWebsite") === "true" || false;
  }

  //
  onMount(async () => {
    getAccountDataFromLocalStorage();
    getPanelInfo();
    fetchAdmin();
    // getWebsiteInfoFromJson();
    // getProductsInfoFromJson();
    // getGoogleInfoFromJson();
    return;
  });

  // scroll product section when hovering with mouse and using scroll wheel
  const handleWheel = (e) => {
    let t = productContainer.getElement();

    if (t.scrollLeft >= 0 && t.scrollLeft < t.scrollWidth - t.clientWidth) {
      t.scrollLeft += e.deltaY;
    }
    if (t.scrollLeft > 0 && t.scrollLeft < t.scrollWidth - t.clientWidth - 1) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  //
  const unsavedAreYouSureChanges = () => {
    if (confirm("are you sure you want to change this?")) {
      unsavedChanges();
    } else {
      getLatestDataFromLocalStorage();
    }
  };

  //
  const unsavedChanges = () => {
    openBanner = true;
    open = true;
  };

  //asyncGetJsonFromUrl
  const getJsonFromUrl = async (url, callback) => {
    return await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // TODO: call network service to set data
  async function onSave() {
    //console.log(postJson);
    //localStorage.setItem('accounts', JSON.stringify(account));
    await postJsonToTenant(website, "website.json");
    await postJsonToTenant(google, "google.json");
    await postJsonToTenant(products, "products.json");

    localStorage.setObject("--store-website", website, 1);
    localStorage.setObject("--store-products", products, 1);
    localStorage.setObject("--store-google", google, 30);

    getPanelInfo();
    fetchAdmin();

    openDialogForEditing = false;
  }

  //
  async function onDiscard() {
    getLatestDataFromLocalStorage();
    fetchAdmin();
  }

  // first step in adding product
  function onAddProduct() {
    let product = _NEW_PRODUCT_(products);

    data = product;

    openDialogForEditing = true;
    return;
  }

  // save new products
  function onSaveProducts(newProduct) {
    if (products.indexOf(newProduct) === -1 && products.push(newProduct)) {
      localStorage.setObject("--store-products", products, 1);
    } else {
      products[products.indexOf(newProduct)] = newProduct;
      localStorage.setObject("--store-products", products, 1);
    }
    products = [...products];
    //sort products by id
    products?.sort((a, b) => a.id - b.id).reverse();
    openDialogForEditing = false;
    open = true;
    unsavedChanges();
  }

  //remove product by id from array
  function removeProduct(id) {
    products = products.filter((product) => product.id !== id);
    unsavedChanges();
  }

  let scrollPosition;
  $: () => {
    document.getElementById(
      "saved-changes"
    ).style = `position:absolute;top: ${scrollPosition}px;`;
  };
</script>

<svelte:window bind:scrollY={scrollPosition} />

<div id="saved-changes" class="top-app-bar-container">
  <Banner
    bind:open
    bind:centered
    bind:mobileStacked
    on:SMUIBanner:closed={handleBannerClosed}
  >
    <Icon slot="icon" class="material-icons">priority_high</Icon>
    <Label slot="label"
      >There are unsaved changes.
      <Button secondary on:click={onDiscard}>Discard</Button>
      <Button secondary on:click={onSave}>Save</Button>
    </Label>
  </Banner>
</div>
<!-- <Drawer>
  yrdy
</Drawer> -->
<section class="container">
  <Paper elevation={0}>
    <!--<Title>Dundas & Sons</Title>-->
    <!-- <Subtitle>Dundas & Sons Admin.</Subtitle> -->
    <!-- <p>use this Page to configure your plugins</p> -->
    <br />
    <Modules.Account {unsavedChanges} />
    <br />
    <!-- WEBSITTE -->
    <Modules.Website {unsavedChanges} />
    <!-- PRODUCTS -->
    <Accordion>
      <Panel
        bind:open={panelProducts}
        on:click={(e) => {
          localStorage.setItem("--panel--panelProducts", panelProducts);
        }}
      >
        <Header>
          <strong class="mdc-typography--headline6">Products</strong>
          <IconButton slot="icon" toggle pressed={panelProducts}>
            <Icon class="material-icons" on>expand_less</Icon>
            <Icon class="material-icons">expand_more</Icon>
          </IconButton>

          <Button
            raised
            disabled={!panelProducts}
            on:click={(e) => {
              onAddProduct();
              e.preventDefault();
              e.stopPropagation();
            }}>Add New</Button
          >
          <Button
            raised
            disabled
            on:click={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>View All</Button
          >
          <!-- <Button raised on:click={onAddProduct}>View All</Button> -->
        </Header>
        <Content
          bind:this={productContainer}
          style="display:flex;overflow:auto;"
          on:wheel={handleWheel}
        >
          <!-- <Card on:click={onAddProduct}>
            <span style='content: "\003F";opacity:0.1;left:32%;top:40%;font-size:166px;position:absolute;'>+</span>
            <Content>{""}</Content>
            <Actions style="opacity:0; user-events:none;">
              <ActionButtons>
                <Button on:click={()=> {openDialogForEditing=true}}>
                  <Label>Edit</Label>
                </Button>
                <Button style="color:red;" on:click={()=> clicked++}>
                  <Label>Delete</Label>
                </Button>
              </ActionButtons>
            </Actions>
          </Card> -->
          {#each products as product, i}
            <Card
              on:click={(e) => {
                data = product;
                console.log(data);
                openDialogForEditing = true;
                e.stopPropagation();
              }}
            >
              <span
                style="content: '\003F';opacity:0.01;left:37%;top:40%;font-size:166px;position:absolute;"
              >
                &#63;</span
              >
              <img
                src={product.thumb}
                style="width:100%;height:100%;object-fit:cover;max-width:275px;"
              />
              <Content>{product.name}</Content>
              <Actions>
                <ActionButtons>
                  <Button
                    on:click={(e) => {
                      data = product;
                      console.log(data);
                      openDialogForEditing = true;
                      e.stopPropagation();
                    }}
                  >
                    <Label>Edit</Label>
                  </Button>
                  <Button
                    style="color:red;"
                    on:click={(e) => {
                      if (
                        confirm(
                          "Are you sure you want to delete " +
                            product.name +
                            "?"
                        )
                      ) {
                        removeProduct(product.id);
                      }
                      e.stopPropagation();
                    }}
                  >
                    <Label>Delete</Label>
                  </Button>
                </ActionButtons>
                <ActionIcons>
                  <!-- <IconButton on:click={()=> clicked++}
                  toggle
                  disabled
                  aria-label="Add to featured"
                  title="Add to featured"
                  >
                  <Icon disabled class="material-icons" on>favorite</Icon>
                  <Icon disabled class="material-icons">favorite_border</Icon>
                </IconButton>
                <IconButton disabled class="material-icons" on:click={()=> clicked++}
                  title="Share">share</IconButton> -->
                  <!-- <IconButton
            class="material-icons"
            on:click={() => clicked++}
            title="More options">more_vert</IconButton
          > -->
                </ActionIcons>
              </Actions>
            </Card>
          {/each}
        </Content>
      </Panel>
    </Accordion>
    <!-- LAYOUDS -->
    <Accordion>
      <Panel
        bind:open={panelLayouts}
        on:click={(e) => {
          localStorage.setItem("--panel--panelLayouts", panelLayouts);
        }}
        disabled
      >
        <Header>
          <strong>Layouts</strong>
          <IconButton slot="icon" toggle pressed={panelProducts}>
            <Icon class="material-icons" on>expand_less</Icon>
            <Icon class="material-icons">expand_more</Icon>
          </IconButton>
        </Header>
        <Content style="display:flex;overflow:scroll;" on:wheel={handleWheel}>
          {#each layouts as layout, i}
            <Card
              on:click={(e) => {
                data = layout;
                layoutSelected = layout;
                e.stopPropagation();
              }}
            >
              <span
                style="content: '\003F';opacity:0.1;left:37%;top:40%;font-size:166px;position:absolute;"
              >
                &#63;</span
              >
              <img
                src={layout.image}
                style="width:100%;height:100%;object-fit:cover;max-width:275px;"
              />
              <Content>{layout.name}</Content>
              <Actions>
                <ActionButtons>
                  <Button
                    on:click={(e) => {
                      data = layout;
                      layoutSelected = layout;
                      e.stopPropagation();
                    }}
                  >
                    <Label
                      >{layout === layoutSelected
                        ? "Selected"
                        : "Select"}</Label
                    >
                  </Button>
                </ActionButtons>
                <ActionIcons>
                  <IconButton
                    on:click={() => clicked++}
                    toggle
                    disabled
                    aria-label="Add to featured"
                    title="Add to featured"
                  >
                    <Icon disabled class="material-icons" on>favorite</Icon>
                    <Icon disabled class="material-icons">favorite_border</Icon>
                  </IconButton>
                  <IconButton
                    disabled
                    class="material-icons"
                    on:click={() => clicked++}
                    title="Share">share</IconButton
                  >
                  <!-- <IconButton
                class="material-icons"
                on:click={() => clicked++}
                title="More options">more_vert</IconButton
              > -->
                </ActionIcons>
              </Actions>
            </Card>
          {/each}
        </Content>
      </Panel>
    </Accordion>
    <br />
    <Modules.Google {unsavedChanges} />
  </Paper>
</section>
<DialogForEditing
  {data}
  open={openDialogForEditing}
  onSave={onSaveProducts}
  onClose={() => {
    openDialogForEditing = false;
  }}
  onDismiss={() => {
    openDialogForEditing = false;
    unsavedChanges();
  }}
  onDelete={(id) => {
    removeProduct(id);
    unsavedChanges();
  }}
/>

<style>
  #saved-changes {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 1;
  }
</style>
