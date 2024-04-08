# Systems-Sync

Sincronizador de servicios del Partido Digital, de modo que los siguientes sistemas descriptos esten sincronizados.

Realizado como Cloudflare Worker, e implementa un receptor de eventos de webhook para las siquientes plataformas.

## Configuración

Para poder utilizar este sincronizador, los siguientes variables de entorno son necesarias:

```
	AUTH0_TOKEN: string;
	MAUTIC_SECRET: string;
	MERCADO_PAGO_SECRET_KEY: string;
```

Más detalle de a qué refiere cada una en la descripción de cada plataforma integrada.

## Plataformas

### Auth0

[Auth0] es el servicio de autenticación que utiliza el Partido Digital.

El handler correspondiente a Auth0 gestiona los siguientes eventos:

 - Actualiza contactos existentes en Mautic si ya existen
   - Nombre completo (por la integración con IDUruguay)
   - Cédula de identidad (por la integración con IDUruguay)

Consideraciones:

- No se crean nuevos contactos en Mautic de los eventos de Auth0 ya que la única fuente de verdad sobre las personas con acceso está en Mautic,
	por lo que no debería pasar nunca que una nueva persona se crea en Auth0 directamente.

### Mautic

[Mautic] es la herramienta de manejo de contactos (CRM) que utiliza el Partido Digital.

El handler correspondiente a Mautic gestiona los siguientes eventos:

 - Crea nuevos usuarios en Auth0 cuando nuevos contactos se crean en Mautic
 - Actualiza usuarios existentes en Auth0 cuando se actualizan contactos en Mautic
   - Cuando se valida la cédula de un usuario manualmente
   - Cuando se cambia a qué grupos tiene acceso

### MercadoPago

[MercadoPago] es el método para recibir afiliaciones del Partido Digital.

El handler correspondiente a MercadoPago gestiona los siguientes eventos:

 - Pago de subscripción recurrente
 - Pago de afiliación
 -

 - [Auth0]: https://auth0.com
 - [Mautic]: https://mautic.org
 - [MercadoPago]: https://mercadopago.com.uy
