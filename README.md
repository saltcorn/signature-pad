# signature-pad

Record signatures to file images, based on the [signature_pad library](https://github.com/szimek/signature_pad)

## How to use

1. Install the signature-pad in Saltcorn version 0.8.6-beta.5 or later
2. In a table, create a field with type "File". We will assume this is called Signature but it can called anything
3. Create an Edit view for your table
4. Click on the Signature field that is already generated. It will show a normal file choose.
5. Change the field view to "Signature Pad" in the field settings.
6. Optionally, set the folder you would like the signature of files to be put in.

Thats it! Now when you save the form, the signature is added as PNG file and linked in the table row.

If you are modifying an existing Edit view, just drop a field into the canvas in the builder, change field to Signature (or whatever you called the signature field) and change the fieldview to Signature Pad
